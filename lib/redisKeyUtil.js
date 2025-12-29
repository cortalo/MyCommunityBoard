export const RedisKeyUtil = {
  getEntityLikeKey: (entityType, entityId) => {
    return `like:entity:${entityType}:${entityId}`;
  },

  getUserLikeKey: (userId) => {
    return `like:user:${userId}`;
  },

  getFolloweeKey: (userId, entityType) => {
    return `like:followee:${userId}:${entityType}`;
  },

  getFollowerKey: (entityType, entityId) => {
    return `like:follower:${entityType}:${entityId}`;
  },
};
