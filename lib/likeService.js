import { redis } from "./redis";
import { RedisKeyUtil } from "./redisKeyUtil";

export const LikeService = {
  like: async (userId, entityType, entityId, entityUserId) => {
    const entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
    const userLikeKey = RedisKeyUtil.getUserLikeKey(entityUserId);
    const isMember = await redis.sismember(entityLikeKey, userId);
    if (isMember) {
      await redis.srem(entityLikeKey, userId);
      await redis.decr(userLikeKey);
    } else {
      await redis.sadd(entityLikeKey, userId);
      await redis.incr(userLikeKey);
    }

    return !isMember;
  },

  findEntityLikeCount: async (entityType, entityId) => {
    const entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
    return await redis.scard(entityLikeKey);
  },

  findEntityLikeStatus: async (userId, entityType, entityId) => {
    const entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
    const isMember = await redis.sismember(entityLikeKey, userId);
    return isMember ? 1 : 0;
  },

  // find total number of like a user have
  findUserLikeCount: async (userId) => {
    const userLikeKey = RedisKeyUtil.getUserLikeKey(userId);
    const count = await redis.get(userLikeKey);
    return count === null ? 0 : parseInt(count, 10);
  },
};
