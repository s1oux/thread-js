import { CommentReactionModel, CommentModel, UserModel, ImageModel } from '../models/index';
import BaseRepository from './baseRepository';

class CommentReactionRepository extends BaseRepository {
  getCommentReactions(commentId) {
    return this.model.findAll({
      group: [
        'commentReaction.id',
        'comment.id',
        'post.id',
        'user.id',
        'user->image.id'
      ],
      where: { commentId },
      include: [{ // check how to add comment/post inclusion
        model: UserModel,
        attributes: ['id', 'username'],
        include: {
          model: ImageModel,
          attributes: ['id', 'link']
        }
      }]
    });
  }

  getCommentReaction(userId, commentId) {
    return this.model.findOne({
      group: [
        'commentReaction.id',
        'comment.id',
        'post.id'
      ],
      where: { userId, commentId },
      include: [{ // check how to add comment inclusion
        model: CommentModel,
        attributes: ['id', 'userId']
      }]
    });
  }
}

export default new CommentReactionRepository(CommentReactionModel);

