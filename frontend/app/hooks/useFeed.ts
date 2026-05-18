'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSocket } from './useSocket';
import { fetchFeeds, createFeed as createFeedAPI } from '../services/api';
import { SOCKET_EVENTS } from '../utils/constants';

interface Feed {
  id: number;
  title: string;
  message: string;
  created_at: string;
}

export const useFeed = () => {
  const { isConnected, subscribe } = useSocket();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial feeds
  useEffect(() => {
    const fetchInitialFeeds = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchFeeds();
        setFeeds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch feeds');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialFeeds();
  }, []);

  // Subscribe to feeds list updates
  useEffect(() => {
    const unsubscribe = subscribe(SOCKET_EVENTS.FEEDS_LIST, (data: Feed[]) => {
      setFeeds(data);
    });

    return unsubscribe;
  }, [subscribe]);

  // Subscribe to new feed events
  useEffect(() => {
    const unsubscribe = subscribe(SOCKET_EVENTS.FEED_NEW, (newFeed: Feed) => {
      setFeeds((prevFeeds) => [newFeed, ...prevFeeds]);
    });

    return unsubscribe;
  }, [subscribe]);

  const createFeed = useCallback(
    async (title: string, message: string): Promise<Feed> => {
      try {
        const feed = await createFeedAPI(title, message);
        return feed;
      } catch (err) {
        throw err;
      }
    },
    []
  );

  return {
    feeds,
    isLoading,
    error,
    isConnected,
    createFeed,
  };
};
