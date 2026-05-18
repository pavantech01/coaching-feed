import { feedDAO } from '../dao/FeedDAO';
import { getCache, setCache, deleteCache } from '../config/redis';
import { Feed, CreateFeedDTO } from '../types/index';
import { validateFeedInput } from '../utils/validators';
import { logger } from '../utils/logger';

const FEED_CACHE_KEY = 'feed:list';

export class FeedService {
  async getAllFeeds(): Promise<Feed[]> {
    try {
      // Try to get from cache first
      const cachedFeeds = await getCache<Feed[]>(FEED_CACHE_KEY);
      if (cachedFeeds) {
        logger.info('Returning feeds from cache');
        return cachedFeeds;
      }

      // Fall back to database
      const feeds = await feedDAO.getAll();
      logger.info(`Fetched ${feeds.length} feeds from database`);

      // Cache the result
      await setCache(FEED_CACHE_KEY, feeds);

      return feeds;
    } catch (error) {
      logger.error('Error in getAllFeeds', { error });
      throw new Error('Failed to fetch feeds');
    }
  }

  async getFeedById(id: number): Promise<Feed | null> {
    try {
      const feed = await feedDAO.getById(id);
      return feed;
    } catch (error) {
      logger.error('Error in getFeedById', { error });
      throw new Error('Failed to fetch feed');
    }
  }

  async createFeed(dto: CreateFeedDTO): Promise<Feed> {
    try {
      // Validate input
      const validation = validateFeedInput(dto.title, dto.message);
      if (!validation.valid) {
        const error = new Error(validation.errors.join(', '));
        error.name = 'ValidationError';
        throw error;
      }

      // Create feed in database
      const feed = await feedDAO.create(dto.title.trim(), dto.message.trim());
      logger.info(`Feed created successfully: ${feed.id}`);

      // Invalidate cache
      await deleteCache(FEED_CACHE_KEY);
      logger.info('Feed cache invalidated');

      return feed;
    } catch (error) {
      logger.error('Error in createFeed', { error });
      if (error instanceof Error && error.name === 'ValidationError') {
        throw error;
      }
      throw new Error('Failed to create feed');
    }
  }

  async updateFeed(
    id: number,
    dto: CreateFeedDTO
  ): Promise<Feed | null> {
    try {
      // Validate input
      const validation = validateFeedInput(dto.title, dto.message);
      if (!validation.valid) {
        const error = new Error(validation.errors.join(', '));
        error.name = 'ValidationError';
        throw error;
      }

      // Update feed in database
      const feed = await feedDAO.update(id, dto.title.trim(), dto.message.trim());
      logger.info(`Feed updated successfully: ${id}`);

      // Invalidate cache
      await deleteCache(FEED_CACHE_KEY);
      logger.info('Feed cache invalidated');

      return feed;
    } catch (error) {
      logger.error('Error in updateFeed', { error });
      if (error instanceof Error && error.name === 'ValidationError') {
        throw error;
      }
      throw new Error('Failed to update feed');
    }
  }

  async deleteFeed(id: number): Promise<boolean> {
    try {
      const deleted = await feedDAO.delete(id);
      logger.info(`Feed deleted: ${id}`);

      // Invalidate cache
      await deleteCache(FEED_CACHE_KEY);
      logger.info('Feed cache invalidated');

      return deleted;
    } catch (error) {
      logger.error('Error in deleteFeed', { error });
      throw new Error('Failed to delete feed');
    }
  }
}

export const feedService = new FeedService();
