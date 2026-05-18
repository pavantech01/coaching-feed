'use client';

import { useFeed } from './hooks/useFeed';
import { FeedList } from './components/FeedList';
import { ErrorAlert } from './components/ErrorAlert';

export default function Home() {
  const { feeds, isLoading, error, isConnected } = useFeed();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Coaching Feed</h1>
          <p className="text-gray-600">
            Realtime coaching updates and insights
          </p>
          <div className="mt-4">
            {isConnected ? (
              <div className="inline-flex items-center bg-green-50 border border-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Live
              </div>
            ) : (
              <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2 animate-pulse"></span>
                Connecting...
              </div>
            )}
          </div>
        </div>

        {error && <ErrorAlert message={error} />}

        <FeedList feeds={feeds} isLoading={isLoading} />
      </div>
    </main>
  );
}
