import { PostReactionModel, PostModel, UserModel, ImageModel } from '../models/index';
import BaseRepository from './baseRepository';

class PostReactionRepository extends BaseRepository {
  getPostReactions(postId) {
    return this.model.findAll({
      group: [
        'postReaction.id',
        'user.id',
        'user->image.id'
      ],
      where: { postId },
      include: [{
        model: UserModel,
        attributes: ['id', 'username'],
        include: {
          model: ImageModel,
          attributes: ['id', 'link']
        }
      }]
    });
  }

  getLikeByPostReactions(userId) {
    return this.model.findAll({
      group: [
        'postReaction.id'
      ],
      where: { userId, isLike: true }
    });
  }

  getPostReaction(userId, postId) {
    return this.model.findOne({
      group: [
        'postReaction.id',
        'post.id'
      ],
      where: { userId, postId },
      include: [{
        model: PostModel,
        attributes: ['id', 'userId']
      }]
    });
  }
}

export default new PostReactionRepository(PostReactionModel);
// Add identical commentReaction

