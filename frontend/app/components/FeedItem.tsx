'use client';

interface Feed {
  id: number;
  title: string;
  message: string;
  created_at: string;
}

interface FeedItemProps {
  feed: Feed;
}

export const FeedItem = ({ feed }: FeedItemProps) => {
  const formattedDate = new Date(feed.created_at).toLocaleString();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feed.title}</h3>
          <p className="text-gray-700 mb-3">{feed.message}</p>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {formattedDate}
      </div>
    </div>
  );
};
