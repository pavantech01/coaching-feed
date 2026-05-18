const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = levels[LOG_LEVEL as keyof typeof levels] || levels.info;

export const logger = {
  error: (message: string, error: any) => {
    if (currentLevel >= levels.error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
  },

  warn: (message: string) => {
    if (currentLevel >= levels.warn) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }
  },

  info: (message: string) => {
    if (currentLevel >= levels.info) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  },

  debug: (message: string, data?: unknown) => {
    if (currentLevel >= levels.debug) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data);
    }
  },
};
