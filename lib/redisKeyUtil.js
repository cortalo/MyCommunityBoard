export const RedisKeyUtil = {
  getEntityLikeKey: (entityType, entityId) => {
    return `like:entity:${entityType}:${entityId}`;
  },

  getUserLikeKey: (userId) => {
    return `like:user:${userId}`;
  },
};
