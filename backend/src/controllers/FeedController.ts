import { Request, Response } from 'express';
import { feedService } from '../services/FeedService';
import { CreateFeedDTO, ApiResponse } from '../types/index';
import { logger } from '../utils/logger';
import { broadcastNewFeed } from '../config/socket';

export class FeedController {
  async handleGetFeed(req: Request, res: Response): Promise<void> {
    try {
      const feeds = await feedService.getAllFeeds();

      const response: ApiResponse<typeof feeds> = {
        success: true,
        data: feeds,
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error('Error in handleGetFeed', { error });
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to fetch feeds',
      };
      res.status(500).json(response);
    }
  }

  async handlePostFeed(req: Request, res: Response): Promise<void> {
    try {
      const { title, message } = req.body;

      // Basic validation (detailed validation in service)
      if (!title || !message) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Title and message are required',
        };
        res.status(400).json(response);
        return;
      }

      const dto: CreateFeedDTO = { title, message };
      const feed = await feedService.createFeed(dto);

      // Broadcast new feed to all connected clients
      try {
        broadcastNewFeed(feed);
      } catch (broadcastError) {
        logger.warn(`Failed to broadcast new feed: ${broadcastError}`);
        // Don't fail the request if broadcast fails
      }

      const response: ApiResponse<typeof feed> = {
        success: true,
        data: feed,
        message: 'Feed created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      logger.error('Error in handlePostFeed', { error });

      if (error instanceof Error && error.name === 'ValidationError') {
        const response: ApiResponse<null> = {
          success: false,
          error: error.message,
        };
        res.status(400).json(response);
        return;
      }

      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to create feed',
      };
      res.status(500).json(response);
    }
  }
}

export const feedController = new FeedController();
