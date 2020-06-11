import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import {
  ADD_POST,
  EDIT_POST,
  LOAD_MORE_POSTS,
  SET_ALL_POSTS,
  SET_EXPANDED_POST,
  SET_EXPANDED_EDIT_POST,
  SET_EXPANDED_EDIT_COMMENT,
  SET_DISPLAY_POST_LIKES
} from './actionTypes';

const setPostsAction = posts => ({
  type: SET_ALL_POSTS,
  posts
});

const addMorePostsAction = posts => ({
  type: LOAD_MORE_POSTS,
  posts
});

const addPostAction = post => ({
  type: ADD_POST,
  post
});

const editPostAction = post => ({
  type: EDIT_POST,
  post
});

const setExpandedPostAction = post => ({
  type: SET_EXPANDED_POST,
  post
});

const setExpandedEditPostAction = post => ({
  type: SET_EXPANDED_EDIT_POST,
  post
});

const setExpandedEditCommentAction = comment => ({
  type: SET_EXPANDED_EDIT_COMMENT,
  comment
});

export const setDisplayPostLikesAction = postLikes => ({
  type: SET_DISPLAY_POST_LIKES,
  postLikes
});

export const loadPosts = filter => async dispatch => {
  const posts = await postService.getAllPosts(filter);
  dispatch(setPostsAction(posts));
};

export const loadMorePosts = filter => async (dispatch, getRootState) => {
  const { posts: { posts } } = getRootState();
  const loadedPosts = await postService.getAllPosts(filter);
  const filteredPosts = loadedPosts
    .filter(post => !(posts && posts.some(loadedPost => post.id === loadedPost.id)));
  dispatch(addMorePostsAction(filteredPosts));
};

export const loadPostsExcept = ({userId}) => async (dispatch) => {
  const posts = await postService.getAllPosts(undefined);
  if(userId) {
    const postsExceptUser = posts.filter(post => post.userId != userId);
    dispatch(setPostsAction(postsExceptUser));
  } else {
    dispatch(setPostsAction(posts));
  }
}

export const applyPost = postId => async dispatch => {
  const post = await postService.getPost(postId);
  dispatch(addPostAction(post));
};

export const addPost = post => async dispatch => {
  const { id } = await postService.addPost(post);
  const newPost = await postService.getPost(id);
  dispatch(addPostAction(newPost));
};

export const editPost = post => async dispatch => {
  const { id } = await postService.editPost(post);
  const updatedPost = await postService.getPost(id);
  dispatch(editPostAction(updatedPost));
}

export const toggleExpandedPost = postId => async dispatch => {
  const post = postId ? await postService.getPost(postId) : undefined;
  dispatch(setExpandedPostAction(post));
};

export const toggleExpandedEditPost = postId => async dispatch => {
  const post = postId ? await postService.getPost(postId) : undefined;
  dispatch(setExpandedEditPostAction(post));
}

// for comment editing toggle button ?
export const toggleExpandedEditComment = commentId => async dispatch => {
  const comment = commentId ? await commentService.getComment(commentId) : undefined;
  dispatch(setExpandedEditCommentAction(comment));
}

export const getPostLikes = postId => async (dispatch) => {
  const postReactions = postId ? await postService.getPostLikes(postId) : undefined;
  const postLikes = postReactions ? postReactions.filter(reaction => reaction.isLike) : undefined;
  dispatch(setDisplayPostLikesAction(postLikes));
}

export const likePost = postId => async (dispatch, getRootState) => {
  const { id } = await postService.likePost(postId);
  const diff = id ? 1 : -1; // if ID exists then the post was liked, otherwise - like was removed

  const mapLikes = post => ({
    ...post,
    likeCount: Number(post.likeCount) + diff // diff is taken from the current closure
  });

  const { posts: { posts, expandedPost } } = getRootState();
  const updated = posts.map(post => (post.id !== postId ? post : mapLikes(post)));

  dispatch(setPostsAction(updated));

  if (expandedPost && expandedPost.id === postId) {
    dispatch(setExpandedPostAction(mapLikes(expandedPost)));
  }
};

export const dislikePost = (postId) => async (dispatch, getRootState) => {
  const { id } = await postService.dislikePost(postId);
  const diff = id ? 1 : -1; // if ID exists then the post was diliked, otherwise - dislike was removed

  const mapDislikes = (post) => ({
    ...post,
    dislikeCount: Number(post.dislikeCount) + diff, // diff is taken from the current closure
  });

  const {
    posts: { posts, expandedPost },
  } = getRootState();
  const updated = posts.map((post) =>
    post.id !== postId ? post : mapDislikes(post)
  );

  dispatch(setPostsAction(updated));

  if (expandedPost && expandedPost.id === postId) {
    dispatch(setExpandedPostAction(mapDislikes(expandedPost)));
  }
};

export const addComment = request => async (dispatch, getRootState) => {
  const { id } = await commentService.addComment(request);
  const comment = await commentService.getComment(id);

  const mapComments = post => ({
    ...post,
    commentCount: Number(post.commentCount) + 1,
    comments: [...(post.comments || []), comment] // comment is taken from the current closure
  });

  const { posts: { posts, expandedPost } } = getRootState();
  const updated = posts.map(post => (post.id !== comment.postId
    ? post
    : mapComments(post)));

  dispatch(setPostsAction(updated));

  if (expandedPost && expandedPost.id === comment.postId) {
    dispatch(setExpandedPostAction(mapComments(expandedPost)));
  }
};


// for comment editing action ?
export const editComment = comment => async (dispatch, getRootState) => {
  const { id } = await commentService.editComment(comment);
  const updatedComment = await commentService.getComment(id);
  
  const mapComments = post => {
    const updatedPostComments = (post.comments || []).filter(comment => comment.id !== updatedComment.id);
    return {
      ...post,
      commentCount: Number(post.commentCount),
      comments: [updatedComment, ...updatedPostComments] 
    };
  };

  const { posts: { posts, expandedPost } } = getRootState();
  const updated = posts.map(post => (post.id !== updatedComment.postId
    ? post
    : mapComments(post)));

  dispatch(setPostsAction(updated));

  if (expandedPost && expandedPost.id === updatedComment.postId) {
    dispatch(setExpandedPostAction(mapComments(expandedPost)));
  }
  
}
