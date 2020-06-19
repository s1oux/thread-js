import * as authService from 'src/services/authService';
import {
  GET_RESOLVE,
  SET_USER,
  SET_USER_BY_TOKEN,
  SET_EXPANDED_EDIT_IMAGE_PROFILE,
  SET_EXPANDED_EDIT_USERNAME_PROFILE,
  SET_EXPANDED_EDIT_STATUS_PROFILE,
  EDIT_PROFILE,
  TOGGLE_STATUS
} from './actionTypes';

const getResolve = resolve => ({
  type: GET_RESOLVE,
  resolve
});

const setToken = token => localStorage.setItem('token', token);

const setUser = user => async dispatch => dispatch({
  type: SET_USER,
  user
});

const setUserByToken = user => ({
  type: SET_USER_BY_TOKEN,
  user
});

export const toggleStatus = () => ({
  type: TOGGLE_STATUS
});

const setAuthData = (user = null, token = '') => (dispatch, getRootState) => {
  setToken(token); // token should be set first before user
  setUser(user)(dispatch, getRootState);
};

const handleAuthResponse = authResponsePromise => async (dispatch, getRootState) => {
  const { user, token } = await authResponsePromise;
  setAuthData(user, token)(dispatch, getRootState);
};

export const login = request => handleAuthResponse(authService.login(request));

export const register = request => handleAuthResponse(authService.registration(request));

export const logout = () => setAuthData();

export const loadCurrentUser = () => async (dispatch, getRootState) => {
  const user = await authService.getCurrentUser();
  setUser(user)(dispatch, getRootState);
};

const setExpandedEditImageProfileAction = user => ({
  type: SET_EXPANDED_EDIT_IMAGE_PROFILE,
  user
});

const setExpandedEditUsernameProfileAction = user => ({
  type: SET_EXPANDED_EDIT_USERNAME_PROFILE,
  user
});

export const setExpandedEditStatusProfileAction = user => ({
  type: SET_EXPANDED_EDIT_STATUS_PROFILE,
  user
});

export const toggleExpandedEditImageProfile = user => async dispatch => {
  const current = user ? await authService.getCurrentUser() : undefined;
  dispatch(setExpandedEditImageProfileAction(current));
};

export const toggleExpandedEditUsernameProfile = user => async dispatch => {
  const current = user ? await authService.getCurrentUser() : undefined;
  dispatch(setExpandedEditUsernameProfileAction(current));
};

export const toggleExpandedEditStatusProfile = user => async dispatch => {
  const current = user ? await authService.getCurrentUser() : undefined;
  dispatch(setExpandedEditStatusProfileAction(current));
};

const editProfileAction = user => ({
  type: EDIT_PROFILE,
  user
});

export const editProfile = user => async dispatch => {
  const { id } = await authService.updateUser(user);
  const updatedProfile = await authService.getCurrentUser();
  dispatch(editProfileAction(updatedProfile));
}

export const resetResolve = () => dispatch => {
  dispatch(getResolve(undefined));
};

export const sendResetLink = (email, link) => async dispatch => {
  const resolve = await authService.sendResetLink({ email, clientHost: link });
  dispatch(getResolve(resolve));
};

export const resetPassword = ( user, password ) => async dispatch => {
  const resolve = await authService.resetPassword({ user, password });
  dispatch(getResolve(resolve));
} 

export const getUserByResetToken = token => async dispatch => {
  const user = await authService.getUserByResetToken({ token });
  dispatch(setUserByToken(user));
};