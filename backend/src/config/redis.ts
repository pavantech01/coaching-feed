import redis, { RedisClientType } from 'redis';
import { logger } from '../utils/logger';

let redisClient: RedisClientType | null = null;

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '60', 10);

export const initializeRedis = async (): Promise<RedisClientType | null> => {
  try {
    redisClient = redis.createClient({
      url: REDIS_URL,
    }) as RedisClientType;

    redisClient.on('error', (err: Error) => {
      logger.error('Redis client error', { error: err });
    });

    redisClient.on('connect', () => {
      logger.info('Redis client connected');
    });

    await redisClient.connect();
    logger.info(`Redis connected at ${REDIS_URL}`);
    return redisClient;
  } catch (error) {
    logger.warn('Redis connection failed - cache disabled');
    return null;
  }
};

export const getRedisClient = (): RedisClientType | null => {
  return redisClient;
};

export const setCache = async (key: string, value: unknown): Promise<void> => {
  try {
    if (!redisClient) return;

    const serialized = JSON.stringify(value);
    await redisClient.setEx(key, CACHE_TTL, serialized);
    logger.debug(`Cache set: ${key} (TTL: ${CACHE_TTL}s)`);
  } catch (error) {
    logger.warn('Failed to set cache');
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    if (!redisClient) return null;

    const cached = await redisClient.get(key);
    if (cached) {
      logger.debug(`Cache hit: ${key}`);
      return JSON.parse(cached) as T;
    }
    logger.debug(`Cache miss: ${key}`);
    return null;
  } catch (error) {
    logger.warn('Failed to get cache');
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    if (!redisClient) return;

    await redisClient.del(key);
    logger.debug(`Cache deleted: ${key}`);
  } catch (error) {
    logger.warn('Failed to delete cache');
  }
};

export const closeRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    logger.info('Redis connection closed');
    redisClient = null;
  }
};
