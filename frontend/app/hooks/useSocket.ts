'use client';

import { useEffect, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { initializeSocket, getSocket, disconnectSocket } from '../services/api';

let socketInstance: Socket | null = null;
const socketListeners = new Map<string, number>();

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      // Initialize socket if not already done
      if (!socketInstance) {
        socketInstance = initializeSocket();
      }

      const socket = getSocket();
      if (!socket) {
        setIsError(true);
        return;
      }

      const handleConnect = () => {
        setIsConnected(true);
        setIsError(false);
      };

      const handleDisconnect = () => {
        setIsConnected(false);
      };

      const handleError = () => {
        setIsError(true);
      };

      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      socket.on('error', handleError);

      // Set initial state
      setIsConnected(socket.connected);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
        socket.off('error', handleError);
      };
    } catch (error) {
      console.error('Error initializing socket:', error);
      setIsError(true);
    }
  }, []);

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    const socket = getSocket();
    if (!socket) return () => {};

    socket.on(event, callback);

    // Track listener count
    const count = socketListeners.get(event) || 0;
    socketListeners.set(event, count + 1);

    return () => {
      socket.off(event, callback);
      const newCount = (socketListeners.get(event) || 1) - 1;
      if (newCount <= 0) {
        socketListeners.delete(event);
      } else {
        socketListeners.set(event, newCount);
      }
    };
  }, []);

  return {
    isConnected,
    isError,
    subscribe,
  };
};
