import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Comment as CommentUI, Header } from 'semantic-ui-react';
import moment from 'moment';

import {
  getPostLikes,
  getCommentLikes,
  likePost,
  dislikePost,
  likeComment,
  dislikeComment,
  toggleExpandedPost,
  toggleExpandedEditComment,
  addComment,
  deleteComment
} from 'src/containers/Thread/actions';
import ExpandedEditComment from "src/containers/ExpandedEditComment";
import Post from 'src/components/Post';
import Comment from 'src/components/Comment';
import AddComment from 'src/components/AddComment';
import Spinner from 'src/components/Spinner';

const ExpandedPost = ({
  user,
  post,
  sharePost,
  getPostLikes,
  getCommentLikes,
  likePost: like,
  dislikePost: dislike,
  likeComment,
  dislikeComment,
  expandedEditComment,
  toggleExpandedPost: toggle,
  toggleExpandedEditComment,
  addComment: add,
  deleteComment
}) => {
  return (
    <Modal dimmer="blurring" open onClose={() => toggle()}>
      {
        post ? (
          <Modal.Content>
            <Post
              post={post}
              getLikes={getPostLikes}
              likePost={like}
              dislikePost={dislike}
              toggleExpandedPost={toggle}
              sharePost={sharePost}
            />
            <CommentUI.Group style={{ maxWidth: '100%' }}>
              <Header as="h3" dividing>
                Comments
              </Header>
              {post.comments && post.comments
                .sort((c1, c2) => moment(c1.createdAt).diff(c2.createdAt))
                .map(comment => (
                  <Comment 
                    key={comment.id} 
                    comment={comment}
                    getLikes={getCommentLikes}
                    likeComment={likeComment}
                    dislikeComment={dislikeComment}
                    deleteComment={
                      user.id === comment.userId ? deleteComment : undefined
                    }
                    toggleExpandedEditComment={
                      user.id === comment.userId ? toggleExpandedEditComment : undefined
                    } 
                  />
                  ))
                }
              <AddComment postId={post.id} addComment={add} />
            </CommentUI.Group>
          </Modal.Content>
        ) : <Spinner />
      }
      {expandedEditComment && <ExpandedEditComment />}
    </Modal>
  );
}

ExpandedPost.defaultProps = {
  expandedEditComment: undefined,
};

ExpandedPost.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleExpandedPost: PropTypes.func.isRequired,
  toggleExpandedEditComment: PropTypes.func.isRequired,
  getPostLikes: PropTypes.func.isRequired,
  getCommentLikes: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  dislikeComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  sharePost: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  post: rootState.posts.expandedPost,
  user: rootState.profile.user,
  expandedEditComment: rootState.posts.expandedEditComment
});

const actions = {
  getPostLikes,
  getCommentLikes,
  likePost,
  dislikePost,
  likeComment,
  dislikeComment,
  toggleExpandedPost,
  toggleExpandedEditComment,
  addComment,
  deleteComment
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedPost);
