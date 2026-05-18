import { getDatabase } from '../config/database';
import { Feed } from '../types/index';
import { logger } from '../utils/logger';

export class FeedDAO {
  async create(
    title: string,
    message: string
  ): Promise<Feed> {
    const db = getDatabase();

    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO feeds (title, message, created_at) VALUES (?, ?, ?)';
      const created_at = new Date().toISOString();

      db.run(sql, [title, message, created_at], function (this: any, err: Error | null) {
        if (err) {
          logger.error('Failed to insert feed', { error: err });
          reject(err);
        } else {
          const feed: Feed = {
            id: this.lastID as number,
            title,
            message,
            created_at,
          };
          logger.debug(`Feed created with ID: ${feed.id}`);
          resolve(feed);
        }
      });
    });
  }

  async getAll(): Promise<Feed[]> {
    const db = getDatabase();

    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, title, message, created_at FROM feeds ORDER BY created_at DESC';

      db.all(sql, (err: Error | null, rows: Feed[] | undefined) => {
        if (err) {
          logger.error('Failed to fetch feeds', { error: err });
          reject(err);
        } else {
          logger.debug(`Fetched ${rows?.length || 0} feeds from database`);
          resolve(rows || []);
        }
      });
    });
  }

  async getById(id: number): Promise<Feed | null> {
    const db = getDatabase();

    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, title, message, created_at FROM feeds WHERE id = ?';

      db.get(sql, [id], (err: Error | null, row: Feed | undefined) => {
        if (err) {
          logger.error(`Failed to fetch feed with ID ${id}: ${err.message}`, { error: err });
          reject(err);
        } else {
          logger.debug(`Fetched feed with ID: ${id}`);
          resolve(row || null);
        }
      });
    });
  }

  async update(
    id: number,
    title: string,
    message: string
  ): Promise<Feed | null> {
    const db = getDatabase();

    return new Promise((resolve, reject) => {
      const sql = 'UPDATE feeds SET title = ?, message = ? WHERE id = ?';

      db.run(sql, [title, message, id], (err: Error | null) => {
        if (err) {
          logger.error(`Failed to update feed with ID ${id}: ${err.message}`, { error: err });
          reject(err);
        } else {
          this.getById(id)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  }

  async delete(id: number): Promise<boolean> {
    const db = getDatabase();

    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM feeds WHERE id = ?';

      db.run(sql, [id], function (this: any, err: Error | null) {
        if (err) {
          logger.error(`Failed to delete feed with ID ${id}: ${err.message}`, { error: err });
          reject(err);
        } else {
          logger.debug(`Feed deleted with ID: ${id}`);
          resolve(this.changes > 0);
        }
      });
    });
  }
}

export const feedDAO = new FeedDAO();
