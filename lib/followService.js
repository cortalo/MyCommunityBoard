import { redis } from "./redis";
import { RedisKeyUtil } from "./redisKeyUtil";

export const FollowService = {
  // userId follow entityId
  follow: async (userId, entityType, entityId) => {
    const followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
    const followerKey = RedisKeyUtil.getFollowerKey(entityType, entityId);

    await redis.sadd(followeeKey, entityId);
    await redis.sadd(followerKey, userId);
  },

  unfollow: async (userId, entityType, entityId) => {
    const followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
    const followerKey = RedisKeyUtil.getFollowerKey(entityType, entityId);

    await redis.srem(followeeKey, entityId);
    await redis.srem(followerKey, userId);
  },

  findFolloweeCount: async (userId, entityType) => {
    const followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
    return await redis.scard(followeeKey);
  },

  findFollowerCount: async (entityType, entityId) => {
    const followerKey = RedisKeyUtil.getFollowerKey(entityType, entityId);
    return await redis.scard(followerKey);
  },

  hasFollowed: async (userId, entityType, entityId) => {
    const followeeKey = RedisKeyUtil.getFolloweeKey(userId, entityType);
    const isMember = await redis.sismember(followeeKey, entityId);
    return isMember;
  },
};
