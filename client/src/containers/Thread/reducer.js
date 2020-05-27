import {
  SET_ALL_POSTS,
  LOAD_MORE_POSTS,
  ADD_POST,
  EDIT_POST,
  SET_EXPANDED_POST,
  SET_EXPANDED_EDIT_POST
} from './actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
        hasMorePosts: Boolean(action.posts.length)
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
    default:
      return state;
  }
};
