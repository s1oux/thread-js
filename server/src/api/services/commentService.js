import commentRepository from '../../data/repositories/commentRepository';

export const create = (userId, comment) => commentRepository.create({
  ...comment,
  userId
});

export const getCommentById = id => commentRepository.getCommentById(id);

export const update = async comment => commentRepository.updateById(
  comment.id, { body: comment.body }
);
