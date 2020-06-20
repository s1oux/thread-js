import {
  SET_ALL_POSTS,
  SET_DISPLAY_POST_LIKES,
  SET_DISPLAY_COMMENT_LIKES,
  LOAD_MORE_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SET_EXPANDED_POST,
  SET_EXPANDED_EDIT_POST,
  SET_EXPANDED_EDIT_COMMENT
} from './actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
        hasMorePosts: Boolean(action.posts.length)
      };
    case SET_DISPLAY_POST_LIKES:
      return {
        ...state,
        postLikes: action.postLikes
      };
    case SET_DISPLAY_COMMENT_LIKES:
      return {
        ...state,
        commentLikes: action.commentLikes
      };
    case LOAD_MORE_POSTS:
      return {
        ...state,
        posts: [...(state.posts || []), ...action.posts],
        hasMorePosts: Boolean(action.posts.length)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post.id)
      };
    case EDIT_POST:
      const postsWithoutEdited = state.posts.filter(post => post.id !== action.post.id);
      return {
        ...state,
        posts: [action.post, ...postsWithoutEdited]
      };
    case SET_EXPANDED_POST:
      return {
        ...state,
        expandedPost: action.post
      };
    case SET_EXPANDED_EDIT_POST:
      return {
        ...state,
        expandedEditPost: action.post
      };
    case SET_EXPANDED_EDIT_COMMENT:
      return {
        ...state,
        expandedEditComment: action.comment
      };
    default:
      return state;
  }
};
