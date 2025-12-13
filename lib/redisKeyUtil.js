export const RedisKeyUtil = {
  getEntityLikeKey: (entityType, entityId) => {
    return `like:entity:${entityType}:${entityId}`;
  },
};
