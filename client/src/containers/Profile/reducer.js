import {
  SET_USER,
  SET_EXPANDED_EDIT_IMAGE_PROFILE,
  SET_EXPANDED_EDIT_USERNAME_PROFILE,
  EDIT_PROFILE
} from './actionTypes';

export default (state = {}, action) => {
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
      case EDIT_PROFILE:
        return {
          ...state,
          user: action.user
        };
    default:
      return state;
  }
};
