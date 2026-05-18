'use client';

import { useState } from 'react';
import { useFeed } from '../hooks/useFeed';
import { AddFeedForm } from '../components/AddFeedForm';
import { ErrorAlert } from '../components/ErrorAlert';

export default function AdminPage() {
  const { createFeed } = useFeed();
  const [feedError, setFeedError] = useState<string | null>(null);

  const handleCreateFeed = async (title: string, message: string) => {
    try {
      setFeedError(null);
      await createFeed(title, message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create feed';
      setFeedError(errorMessage);
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Add new coaching feeds to broadcast to all users
          </p>
        </div>

        {feedError && <ErrorAlert message={feedError} onDismiss={() => setFeedError(null)} />}

        <AddFeedForm onSubmit={handleCreateFeed} />
      </div>
    </main>
  );
}
