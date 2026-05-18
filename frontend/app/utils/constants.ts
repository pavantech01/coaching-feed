export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const SOCKET_EVENTS = {
  FEEDS_LIST: 'feeds:list',
  FEED_NEW: 'feed:new',
  REQUEST_FEEDS: 'request:feeds',
  ERROR: 'error',
} as const;

export const API_ENDPOINTS = {
  GET_FEEDS: '/feed',
  CREATE_FEED: '/feed',
} as const;
