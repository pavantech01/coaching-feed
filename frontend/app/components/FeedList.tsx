'use client';

import { FeedItem } from './FeedItem';

interface Feed {
  id: number;
  title: string;
  message: string;
  created_at: string;
}

interface FeedListProps {
  feeds: Feed[];
  isLoading: boolean;
}

export const FeedList = ({ feeds, isLoading }: FeedListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading feeds...</p>
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-lg">No feeds yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {feeds.map((feed) => (
        <FeedItem key={feed.id} feed={feed} />
      ))}
    </div>
  );
};
