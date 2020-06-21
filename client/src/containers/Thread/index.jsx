import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as imageService from "src/services/imageService";
import ExpandedPost from "src/containers/ExpandedPost";
import ExpandedEditPost from "src/containers/ExpandedEditPost";
import Post from "src/components/Post";
import AddPost from "src/components/AddPost";
import SharedPostLink from "src/components/SharedPostLink";
import { Checkbox, Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import {
  loadPosts,
  loadPostsOnly,
  loadPostsExcept,
  loadPostsLikedBy,
  loadMorePosts,
  getPostLikes,
  likePost,
  dislikePost,
  toggleExpandedPost,
  toggleExpandedEditPost,
  addPost,
  deletePost,
  sharePost
} from "./actions";

import styles from "./styles.module.scss";

const postsFilter = {
  userId: undefined,
  from: 0,
  count: 10,
};

const Thread = ({
  userId,
  loadPosts: load,
  loadPostsOnly: loadOnly,
  loadPostsExcept: loadExcept,
  loadPostsLikedBy: loadLikedBy,
  loadMorePosts: loadMore,
  posts = [],
  expandedPost,
  expandedEditPost,
  hasMorePosts,
  addPost: createPost,
  deletePost,
  sharePost: sharePostByEmail,
  getPostLikes,
  likePost: like,
  dislikePost: dislike,
  toggleExpandedPost: toggle,
  toggleExpandedEditPost: toggleEdit
}) => {
  const [sharedPostId, setSharedPostId] = useState(undefined);
  const [showOwnPosts, setShowOwnPosts] = useState(false);
  const [hideOwnPosts, setHideOwnPosts] = useState(false);
  const [showLikedByPosts, setShowLikedByPosts] = useState(false);

  const toggleShowOwnPosts = () => {
    setShowOwnPosts(!showOwnPosts);
    postsFilter.userId = showOwnPosts ? undefined : userId;
    postsFilter.from = 0;
    loadOnly(postsFilter);
    postsFilter.from = postsFilter.count; // for the next scroll
  };

  const toggleHideOwnPosts = () => {
    setHideOwnPosts(!hideOwnPosts);
    postsFilter.userId = hideOwnPosts ? undefined : userId;
    postsFilter.from = 0;
    loadExcept(postsFilter);
    postsFilter.from = postsFilter.count;
  };

  const toggleLikedByPosts = () => {
    setShowLikedByPosts(!showLikedByPosts);
    postsFilter.userId = showLikedByPosts ? undefined : userId;
    postsFilter.from = 0;
    loadLikedBy(postsFilter);
    postsFilter.from = postsFilter.count;
  };

  const getMorePosts = () => {
    loadMore(postsFilter);
    const { from, count } = postsFilter;
    postsFilter.from = from + count;
  };

  const sharePost = (id) => {
    setSharedPostId(id);
  };

  const uploadImage = (file) => imageService.uploadImage(file);

  return (
    <div className={styles.threadContent}>
      <div className={styles.addPostForm}>
        <AddPost addPost={createPost} uploadImage={uploadImage} />
      </div>
      <div className={styles.toolbar}>
        <Checkbox
          toggle
          label="Show only my posts"
          checked={showOwnPosts}
          onChange={toggleShowOwnPosts}
          disabled={hideOwnPosts || showLikedByPosts}
        />
      </div>
      <div className={styles.toolbar}>
        <Checkbox
          toggle
          label="Hide own posts"
          checked={hideOwnPosts}
          onChange={toggleHideOwnPosts}
          disabled={showOwnPosts || showLikedByPosts}
        />
      </div>
      <div className={styles.toolbar}>
        <Checkbox
          toggle
          label="Show liked by me"
          checked={showLikedByPosts}
          onChange={toggleLikedByPosts}
          disabled={showOwnPosts || hideOwnPosts}
        />
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={getMorePosts}
        hasMore={hasMorePosts}
        loader={<Loader active inline="centered" key={0} />}
      >
        {posts.map((post) => (
          <Post
            post={post}
            getLikes={getPostLikes}
            likePost={like}
            dislikePost={dislike}
            toggleExpandedPost={toggle}
            toggleExpandedEditPost={userId === post.userId ? toggleEdit : undefined}
            deletePost={userId === post.userId ? deletePost : undefined}
            sharePost={sharePost}
            key={post.id}
          />
        ))}
      </InfiniteScroll>
      {expandedPost && <ExpandedPost sharePost={sharePost} />}
      {expandedEditPost && <ExpandedEditPost uploadImage={uploadImage} />}
      {sharedPostId && (
        <SharedPostLink
          postId={sharedPostId}
          sharePostByEmail={sharePostByEmail}
          close={() => setSharedPostId(undefined)}
        />
      )}
    </div>
  );
};

Thread.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  hasMorePosts: PropTypes.bool,
  expandedPost: PropTypes.objectOf(PropTypes.any),
  userId: PropTypes.string,
  loadPosts: PropTypes.func.isRequired,
  loadPostsOnly: PropTypes.func.isRequired,
  loadPostsExcept: PropTypes.func.isRequired,
  loadPostsLikedBy: PropTypes.func.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  getPostLikes: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  toggleExpandedPost: PropTypes.func.isRequired,
  toggleExpandedEditPost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  sharePost: PropTypes.func.isRequired
};

Thread.defaultProps = {
  posts: [],
  hasMorePosts: true,
  expandedPost: undefined,
  expandedEditPost: undefined,
  userId: undefined,
};

const mapStateToProps = (rootState) => ({
  posts: rootState.posts.posts,
  hasMorePosts: rootState.posts.hasMorePosts,
  expandedPost: rootState.posts.expandedPost,
  expandedEditPost: rootState.posts.expandedEditPost,
  userId: rootState.profile.user.id,
});

const actions = {
  loadPosts,
  loadPostsOnly,
  loadPostsExcept,
  loadPostsLikedBy,
  loadMorePosts,
  getPostLikes,
  likePost,
  dislikePost,
  toggleExpandedPost,
  toggleExpandedEditPost,
  addPost,
  deletePost,
  sharePost
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Thread);