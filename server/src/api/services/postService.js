import postRepository from '../../data/repositories/postRepository';
import postReactionRepository from '../../data/repositories/postReactionRepository';

export const getPosts = filter => postRepository.getPosts(filter);

export const getPostById = id => postRepository.getPostById(id);

export const deletePostById = id => postRepository.deleteById(id);

export const create = (userId, post) => postRepository.create({
  ...post,
  userId
});

export const update = async post => postRepository.updateById(
  post.id, { body: post.body, imageId: post.imageId || null }
);

export const setReaction = async (userId, { postId, isLike = true }) => {
  // define the callback for future use as a promise
  const updateOrDelete = react => (react.isLike === isLike
    ? postReactionRepository.deleteById(react.id)
    : postReactionRepository.updateById(react.id, { isLike }));

  const reaction = await postReactionRepository.getPostReaction(userId, postId);

  const result = reaction
    ? await updateOrDelete(reaction)
    : await postReactionRepository.create({ userId, postId, isLike });

  // the result is an integer when an entity is deleted
  return Number.isInteger(result) ? {} : postReactionRepository.getPostReaction(userId, postId);
};

export const getPostReactions = async postId => {
  const reactions = await postReactionRepository.getPostReactions(postId);
  return reactions;
};
