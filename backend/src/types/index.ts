export interface Feed {
  id: number;
  title: string;
  message: string;
  created_at: string;
}

export interface CreateFeedDTO {
  title: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SocketEventPayload {
  feed: Feed;
  timestamp: string;
}
