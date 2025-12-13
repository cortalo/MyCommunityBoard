import { redis } from "./redis";
import { RedisKeyUtil } from "./redisKeyUtil";

export const LikeService = {
  like: async (userId, entityType, entityId) => {
    const entityLikeKey = RedisKeyUtil.getEntityLikeKey(entityType, entityId);
    const isMember = await redis.sismember(entityLikeKey, userId);
    if (isMember) {
      await redis.srem(entityLikeKey, userId);
    } else {
      await redis.sadd(entityLikeKey, userId);
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
};
