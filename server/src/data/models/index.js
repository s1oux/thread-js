import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const ResetToken = orm.import('./resetToken');
const Post = orm.import('./post');
const PostReaction = orm.import('./postReaction');
const Comment = orm.import('./comment');
const CommentReaction = orm.import('./commentReaction');
const Image = orm.import('./image');

associate({
  User,
  ResetToken,
  Post,
  PostReaction,
  Comment,
  CommentReaction,
  Image
});

export {
  User as UserModel,
  ResetToken as ResetTokenModel,
  Post as PostModel,
  PostReaction as PostReactionModel,
  Comment as CommentModel,
  CommentReaction as CommentReactionModel,
  Image as ImageModel
};
