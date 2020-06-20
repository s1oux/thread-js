import {
  SET_USER,
  SET_ERROR,
  SET_USER_BY_TOKEN,
  SET_EXPANDED_EDIT_IMAGE_PROFILE,
  SET_EXPANDED_EDIT_USERNAME_PROFILE,
  SET_EXPANDED_EDIT_STATUS_PROFILE,
  EDIT_PROFILE,
  TOGGLE_STATUS,
  GET_RESOLVE
} from './actionTypes';

export default (
  state = {resolve: undefined, showStatus: false },
  action
) => {
  switch (action.type) {
    case GET_RESOLVE: 
      return {
        ...state,
        resolve: action.resolve
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: Boolean(action.user?.id),
        isLoading: false
      };
    case SET_USER_BY_TOKEN:
      return {
        ...state,
        userByToken: action.user,
        isLoading: false
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SET_EXPANDED_EDIT_IMAGE_PROFILE:
      return {
        ...state,
        expandedEditImageProfile: action.user
      };
    case SET_EXPANDED_EDIT_USERNAME_PROFILE:
      return {
        ...state,
        expandedEditUsernameProfile: action.user
      };
    case SET_EXPANDED_EDIT_STATUS_PROFILE:
      return {
        ...state,
        expandedEditStatusProfile: action.user
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: action.user
      };
    case TOGGLE_STATUS:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    default:
      return state;
  }
};
