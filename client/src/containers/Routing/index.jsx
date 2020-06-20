import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Thread from 'src/containers/Thread';
import LoginPage from 'src/containers/LoginPage';
import RegistrationPage from 'src/containers/RegistrationPage';
import ForgotPasswordPage from 'src/containers/ForgotPasswordPage';
import ResetPasswordPage from 'src/containers/ResetPasswordPage';
import Profile from 'src/containers/Profile';
import Header from 'src/components/Header';
import SharedPost from 'src/containers/SharedPost';
import Spinner from 'src/components/Spinner';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import PublicRoute from 'src/containers/PublicRoute';
import Notifications from 'src/components/Notifications';
import { applyPost } from 'src/containers/Thread/actions';

import {
  loadCurrentUser,
  logout,
  setExpandedEditStatusProfileAction,
  toggleStatus
} from 'src/containers/Profile/actions';


const Routing = ({
  user,
  isAuthorized,
  applyPost: newPost,
  logout: signOut,
  loadCurrentUser: loadUser,
  showStatus,
  toggleStatus,
  setExpandedEditStatusProfileAction: toggleStatusChange,
  expandedEditStatusProfile,
  isLoading
}) => {
  useEffect(() => {
    if (!isAuthorized) {
      loadUser();
    }
  });

  return (
    isLoading
      ? <Spinner />
      : (
        <div className="fill">
          {isAuthorized && (
            <header>
              <Header
                user={user}
                logout={signOut}
                showStatus={showStatus}
                toggleStatus={toggleStatus}
                toggleStatusChange={toggleStatusChange}
                expandedEditStatusProfile={expandedEditStatusProfile}
              />
            </header>
          )}
          <main className="fill">
            <Switch>
              <PublicRoute exact path="/login" component={LoginPage} />
              <PublicRoute
                exact
                path="/registration"
                component={RegistrationPage}
              />
              <PublicRoute
                exact
                path="/forgotPassword"
                component={ForgotPasswordPage}
              />
              <PublicRoute
                exact
                path="/reset/:token"
                component={ResetPasswordPage}
              />
              <PrivateRoute exact path="/" component={Thread} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/share/:postHash" component={SharedPost} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </main>
          <Notifications applyPost={newPost} user={user} />
        </div>
      )
  );
};

Routing.propTypes = {
  isAuthorized: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  applyPost: PropTypes.func.isRequired,
  setExpandedEditStatusProfileAction: PropTypes.func.isRequired,
  toggleStatus: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  loadCurrentUser: PropTypes.func.isRequired
};

Routing.defaultProps = {
  isAuthorized: false,
  user: {},
  isLoading: true
};

const actions = {
  loadCurrentUser,
  logout,
  applyPost,
  toggleStatus,
  setExpandedEditStatusProfileAction
};

const mapStateToProps = ({ profile }) => ({
  isAuthorized: profile.isAuthorized,
  user: profile.user,
  expandedEditStatusProfile: profile.expandedEditStatusProfile,
  showStatus: profile.showStatus,
  isLoading: profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);
