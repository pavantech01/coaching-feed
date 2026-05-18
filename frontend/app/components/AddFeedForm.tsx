'use client';

import { useState } from 'react';
import { ErrorAlert } from './ErrorAlert';

interface AddFeedFormProps {
  onSubmit: (title: string, message: string) => Promise<void>;
  isLoading?: boolean;
}

export const AddFeedForm = ({ onSubmit, isLoading = false }: AddFeedFormProps) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!message.trim()) {
      setError('Message is required');
      return;
    }

    if (title.length > 255) {
      setError('Title must be less than 255 characters');
      return;
    }

    if (message.length > 2000) {
      setError('Message must be less than 2000 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(title, message);
      setSuccess(true);
      setTitle('');
      setMessage('');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create feed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Coaching Feed</h2>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4">
          ✓ Feed created successfully!
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter feed title"
          maxLength={255}
          disabled={isSubmitting || isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
        />
        <p className="text-xs text-gray-500 mt-1">{title.length}/255</p>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter coaching message"
          maxLength={2000}
          rows={5}
          disabled={isSubmitting || isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{message.length}/2000</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {isSubmitting ? 'Creating...' : 'Create Feed'}
      </button>
    </form>
  );
};
