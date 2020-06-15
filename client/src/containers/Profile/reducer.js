import {
  SET_USER,
  SET_EXPANDED_EDIT_IMAGE_PROFILE,
  SET_EXPANDED_EDIT_USERNAME_PROFILE,
  SET_EXPANDED_EDIT_STATUS_PROFILE,
  EDIT_PROFILE,
  TOGGLE_STATUS
} from './actionTypes';

export default (state = { showStatus: false }, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: Boolean(action.user?.id),
        isLoading: false
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
