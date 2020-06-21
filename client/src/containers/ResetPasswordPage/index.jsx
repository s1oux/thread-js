import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { resetPassword, getUserByResetToken, resetResolve } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import ResetPasswordForm from 'src/components/ResetPasswordForm';

const ResetPasswordPage = (props) => {
  const {
    resetPassword,
    getUserByResetToken,
    resetResolve,
    user,
    resolve
  } = props;

  const fetchUser = () => {
    getUserByResetToken(props.match.params.token);
  };
  useEffect(() => fetchUser(), []);

  const content = user?.notfound ? (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        Your reset token has been expired, or had never been existed.
      </Header>
      <Message>
        Get new reset link?
        {' '}
        <NavLink exact to="/forgotPassword">Reset Password</NavLink>
      </Message>
      <Message>
        Remember password?
        {' '}
        <NavLink exact to="/login">Sign In</NavLink>
      </Message>
    </div>
  ) : (
    resolve?.success ? (
      <div>
      <Header as="h2" color="teal" textAlign="center">
        Password has been changed
      </Header>
      <Message>
        Want to log in?
        {' '}
        <NavLink onClick={() => resetResolve()} exact to="/login">Sign In</NavLink>
      </Message>
    </div>
    ) : (
      <div>
      <Header as="h2" color="teal" textAlign="center">
        Change password
      </Header>
      <ResetPasswordForm user={user} resetPassword={resetPassword} />
      <Message>
        Remember password?
        {' '}
        <NavLink exact to="/login">Sign In</NavLink>
      </Message>
    </div>
    )
  );

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        {content}
      </Grid.Column>
    </Grid>
  );
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  getUserByResetToken: PropTypes.func.isRequired,
  resetResolve: PropTypes.func.isRequired
};

const actions = { resetPassword, getUserByResetToken, resetResolve };

const mapStateToProps = rootState => ({
  user: rootState.profile.userByToken,
  resolve: rootState.profile.resolve
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordPage);
