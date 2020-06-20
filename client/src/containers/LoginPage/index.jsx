import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { login } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import LoginForm from 'src/components/LoginForm';

const LoginPage = ({ login: signIn }) => (
  <Grid textAlign="center" verticalAlign="middle" className="fill">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Logo />
      <Header as="h2" color="teal" textAlign="center">
        Login to your account
      </Header>
      <LoginForm login={signIn} />
      <Message>
        New to us?
        {' '}
        <NavLink exact to="/registration">Sign Up</NavLink>
      </Message>
      <Message>
        Forget password?
        {' '}
        <NavLink exact to="/forgotPassword">Reset Password</NavLink>
      </Message>
    </Grid.Column>
  </Grid>
);

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

const actions = { login };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
