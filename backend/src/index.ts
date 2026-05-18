import express, { Express } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { initializeDatabase, closeDatabase } from './config/database';
import { initializeRedis, closeRedis } from './config/redis';
import { initializeSocket } from './config/socket';
import feedRoutes from './routes/feedRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

let isShuttingDown = false;

const startServer = async (): Promise<void> => {
  try {
    // Initialize database
    await initializeDatabase();
    logger.info('Database initialized');

    // Initialize Redis (optional - will log warning if fails)
    await initializeRedis();

    // Create Express app
    const app: Express = express();

    // Middleware
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/', feedRoutes);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
      });
    });

    // Error handler
    app.use(errorHandler);

    // Create HTTP server
    const httpServer = createServer(app);

    // Initialize Socket.IO
    initializeSocket(httpServer);

    // Start server
    httpServer.listen(PORT, () => {
      logger.info(
        `\n✅ Server running on http://localhost:${PORT}\n📡 WebSocket ready for connections\n🌍 Environment: ${NODE_ENV}\n`
      );
    });

    // Graceful shutdown
    const shutdown = async (signal: string): Promise<void> => {
      if (isShuttingDown) return;
      isShuttingDown = true;

      logger.info(`\n${signal} received, starting graceful shutdown...`);

      httpServer.close(async () => {
        logger.info('HTTP server closed');

        try {
          await closeDatabase();
          await closeRedis();
          logger.info('All connections closed');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown', error);
          process.exit(1);
        }
      });

      // Force close after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after 30 seconds', new Error('Timeout'));
        process.exit(1);
      }, 30000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error(`Failed to start server: ${error}`, error);
    process.exit(1);
  }
};

startServer();
