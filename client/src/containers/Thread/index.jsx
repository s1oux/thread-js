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
  loadPostsExcept,
  loadMorePosts,
  getPostLikes,
  likePost,
  dislikePost,
  toggleExpandedPost,
  toggleExpandedEditPost,
  addPost,
  deletePost
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
  loadPostsExcept: loadExcept,
  loadMorePosts: loadMore,
  posts = [],
  expandedPost,
  expandedEditPost,
  hasMorePosts,
  addPost: createPost,
  deletePost,
  getPostLikes,
  likePost: like,
  dislikePost: dislike,
  toggleExpandedPost: toggle,
  toggleExpandedEditPost: toggleEdit
}) => {
  const [sharedPostId, setSharedPostId] = useState(undefined);
  const [showOwnPosts, setShowOwnPosts] = useState(false);
  const [hideOwnPosts, setHideOwnPosts] = useState(false);

  const toggleShowOwnPosts = () => {
    setShowOwnPosts(!showOwnPosts);
    postsFilter.userId = showOwnPosts ? undefined : userId;
    postsFilter.from = 0;
    load(postsFilter);
    postsFilter.from = postsFilter.count; // for the next scroll
  };

  const toggleHideOwnPosts = () => {
    setHideOwnPosts(!hideOwnPosts);
    postsFilter.userId = hideOwnPosts ? undefined : userId;
    postsFilter.from = 0;
    loadExcept(postsFilter);
    postsFilter.from = postsFilter.count;
  }

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
          disabled={hideOwnPosts}
        />
      </div>
      <div className={styles.toolbar}>
        <Checkbox
          toggle
          label="Hide own posts"
          checked={hideOwnPosts}
          onChange={toggleHideOwnPosts}
          disabled={showOwnPosts}
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
  loadPostsExcept: PropTypes.func.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  getPostLikes: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  toggleExpandedPost: PropTypes.func.isRequired,
  toggleExpandedEditPost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
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
  loadPostsExcept,
  loadMorePosts,
  getPostLikes,
  likePost,
  dislikePost,
  toggleExpandedPost,
  toggleExpandedEditPost,
  addPost,
  deletePost
};
// add to actions dislikePost

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Thread);