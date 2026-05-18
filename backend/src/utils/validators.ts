export const validateFeedTitle = (title: unknown): boolean => {
  if (typeof title !== 'string') return false;
  return title.trim().length > 0 && title.length <= 255;
};

export const validateFeedMessage = (message: unknown): boolean => {
  if (typeof message !== 'string') return false;
  return message.trim().length > 0 && message.length <= 2000;
};

export const sanitizeString = (str: string): string => {
  return str.trim();
};

export const validateFeedInput = (
  title: unknown,
  message: unknown
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!validateFeedTitle(title)) {
    errors.push('Title must be a non-empty string (max 255 characters)');
  }

  if (!validateFeedMessage(message)) {
    errors.push('Message must be a non-empty string (max 2000 characters)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
