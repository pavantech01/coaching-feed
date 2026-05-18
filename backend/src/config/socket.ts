import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { feedService } from '../services/FeedService';
import { logger } from '../utils/logger';

let io: SocketIOServer | null = null;
const connectedClients = new Set<string>();

export const initializeSocket = (httpServer: HTTPServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    connectedClients.add(socket.id);
    logger.info(`Client connected: ${socket.id} (Total: ${connectedClients.size})`);

    // Send initial feed list on connection
    socket.on('request:feeds', async () => {
      try {
        const feeds = await feedService.getAllFeeds();
        socket.emit('feeds:list', feeds);
        logger.debug(`Sent initial feeds to ${socket.id}`);
      } catch (error) {
        // Provide message and metadata to match logger.error signature
        logger.error('Error sending initial feeds', { error });
        socket.emit('error', { message: 'Failed to load feeds' });
      }
    });

    socket.on('disconnect', () => {
      connectedClients.delete(socket.id);
      logger.info(`Client disconnected: ${socket.id} (Total: ${connectedClients.size})`);
    });
  });

  logger.info('Socket.IO initialized');
  return io;
};

export const getSocketIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

export const broadcastNewFeed = (feed: any): void => {
  if (!io) return;
  io.emit('feed:new', feed);
  logger.debug(`Broadcasted new feed to ${connectedClients.size} clients`);
};

export const getConnectedClientsCount = (): number => {
  return connectedClients.size;
};
