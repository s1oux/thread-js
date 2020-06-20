import sequelize from '../db/connection';

import { CommentModel, CommentReactionModel, UserModel, ImageModel } from '../models/index';
import BaseRepository from './baseRepository';

class CommentRepository extends BaseRepository {
  getCommentById(id) {
    return this.model.findOne({
      group: [
        'comment.id',
        'commentReactions.id',
        'user.id',
        'user->image.id'
      ],
      where: { id },
      attributes: {
        include: [
          [sequelize.literal(`
                      (SELECT COUNT(*)
                      FROM "commentReactions" as "commentReaction"
                      WHERE "comment"."id" = "commentReaction"."commentId"
                      and "commentReaction"."isLike" = true)`), 'likeCount'],
          [sequelize.literal(`
                      (SELECT COUNT(*)
                      FROM "commentReactions" as "commentReaction"
                      WHERE "comment"."id" = "commentReaction"."commentId"
                      and "commentReaction"."isLike" = false)`), 'dislikeCount']
        ]
      },
      include: [{
        model: UserModel,
        attributes: ['id', 'username'],
        include: {
          model: ImageModel,
          attributes: ['id', 'link']
        }
      }, {
        model: CommentReactionModel,
        attributes: []
      }]
    });
  }
}

export default new CommentRepository(CommentModel);
