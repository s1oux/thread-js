const now = new Date();

export default new Array(25)
  .fill(true)
  .concat(new Array(25).fill(false))
  .map(isLike => ({
    isLike,
    createdAt: now,
    updatedAt: now
  }));

// Add identical seed for commentReactions**
// ** or seed-data needed only for data after migrations?

