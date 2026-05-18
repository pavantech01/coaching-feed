import sqlite3 from 'sqlite3';
import path from 'path';
import { logger } from '../utils/logger';

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../data/feeds.db');

let db: sqlite3.Database | null = null;

export const initializeDatabase = (): Promise<sqlite3.Database> => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        logger.error('Failed to open database', { error: err });
        reject(err);
      } else {
        logger.info(`Database initialized at ${DB_PATH}`);

        // Create table if not exists
        db!.run(
          `CREATE TABLE IF NOT EXISTS feeds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          (err) => {
            if (err) {
              logger.error('Failed to create feeds table', { error: err });
              reject(err);
            } else {
              logger.info('Feeds table ready');
              resolve(db!);
            }
          }
        );
      }
    });
  });
};

export const getDatabase = (): sqlite3.Database => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
};

export const closeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          logger.error('Failed to close database', { error: err });
          reject(err);
        } else {
          logger.info('Database connection closed');
          db = null;
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};
