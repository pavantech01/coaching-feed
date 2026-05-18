import { Router } from 'express';
import { feedController } from '../controllers/FeedController';

const router = Router();

/**
 * GET /feed
 * Retrieve all feeds
 */
router.get('/feed', (req, res) => feedController.handleGetFeed(req, res));

/**
 * POST /feed
 * Create a new feed
 * Body: { title: string, message: string }
 */
router.post('/feed', (req, res) => feedController.handlePostFeed(req, res));

export default router;
