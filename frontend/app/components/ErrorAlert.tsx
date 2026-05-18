'use client';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert = ({ message, onDismiss }: ErrorAlertProps) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative mb-4">
      <p>{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        >
          ✕
        </button>
      )}
    </div>
  );
};
