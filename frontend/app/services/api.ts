import io, { Socket } from 'socket.io-client';
import { SOCKET_SERVER_URL, SOCKET_EVENTS } from '../utils/constants';

let socket: Socket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY = 1000; // 1 second

export const initializeSocket = (): Socket => {
  if (socket) {
    return socket;
  }

  socket = io(SOCKET_SERVER_URL, {
    reconnection: true,
    reconnectionDelay: RECONNECT_DELAY,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('✅ Connected to server');
    reconnectAttempts = 0;
    // Request feeds list when connected
    socket?.emit(SOCKET_EVENTS.REQUEST_FEEDS);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
  });

  socket.on('connect_error', (error: any) => {
    reconnectAttempts++;
    console.error('Connection error:', error);
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
    }
  });

  socket.on(SOCKET_EVENTS.ERROR, (error: any) => {
    console.error('Server error:', error);
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const onFeedsUpdate = (callback: (feeds: any[]) => void): (() => void) => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }

  socket.on(SOCKET_EVENTS.FEEDS_LIST, callback);

  // Return unsubscribe function
  return () => {
    socket?.off(SOCKET_EVENTS.FEEDS_LIST, callback);
  };
};

export const onNewFeed = (callback: (feed: any) => void): (() => void) => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }

  socket.on(SOCKET_EVENTS.FEED_NEW, callback);

  // Return unsubscribe function
  return () => {
    socket?.off(SOCKET_EVENTS.FEED_NEW, callback);
  };
};

export const fetchFeeds = async (signal?: AbortSignal) => {
  const response = await fetch('http://localhost:3001/feed', { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  const data = await response.json();
  return data.data || [];
};

export const createFeed = async (title: string, message: string) => {
  const response = await fetch('http://localhost:3001/feed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create feed');
  }

  const data = await response.json();
  return data.data;
};
