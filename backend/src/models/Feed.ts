import { Feed, CreateFeedDTO } from '../types/index';

export class FeedModel {
  static createFromDTO(dto: CreateFeedDTO): Omit<Feed, 'id'> {
    return {
      title: dto.title,
      message: dto.message,
      created_at: new Date().toISOString(),
    };
  }

  static isValidFeedDTO(data: unknown): data is CreateFeedDTO {
    if (typeof data !== 'object' || data === null) return false;
    const obj = data as Record<string, unknown>;
    return (
      typeof obj.title === 'string' &&
      typeof obj.message === 'string' &&
      obj.title.length > 0 &&
      obj.title.length <= 255 &&
      obj.message.length > 0 &&
      obj.message.length <= 2000
    );
  }
}
