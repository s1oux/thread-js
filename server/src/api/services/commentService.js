import commentRepository from '../../data/repositories/commentRepository';
import commentReactionRepository from '../../data/repositories/commentReactionRepository';

export const create = (userId, comment) => commentRepository.create({
  ...comment,
  userId
});

export const getCommentById = id => commentRepository.getCommentById(id);

export const deleteCommentById = id => commentRepository.deleteById(id);

export const update = async comment => commentRepository.updateById(
  comment.id, { body: comment.body }
);

export const setReaction = async (userId, { commentId, isLike = true }) => {
  // define the callback for future use as a promise
  const updateOrDelete = react => (react.isLike === isLike
    ? commentReactionRepository.deleteById(react.id)
    : commentReactionRepository.updateById(react.id, { isLike }));

  const reaction = await commentReactionRepository.getCommentReaction(userId, commentId);

  const result = reaction
    ? await updateOrDelete(reaction)
    : await commentReactionRepository.create({ userId, commentId, isLike });

  // the result is an integer when an entity is deleted
  return Number.isInteger(result) ? {} : commentReactionRepository.getCommentReaction(userId, commentId);
};

export const getCommentReactions = async commentId => {
  const reactions = await commentReactionRepository.getCommentReactions(commentId);
  return reactions;
};
