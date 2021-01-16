import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimit',
    points: 5,
    duration: 1,
});

export default async function (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await rateLimiter.consume(request.ip);
        return next();
    } catch (err) {
        throw new AppError('Two many requests', 429);
    }
}
