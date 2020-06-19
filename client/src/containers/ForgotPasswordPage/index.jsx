import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { sendResetLink } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import ForgotPasswordForm from 'src/components/ForgotPasswordForm';

const ForgotPasswordPage = ({ sendResetLink, resolve }) => (
  <Grid textAlign="center" verticalAlign="middle" className="fill">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Logo />
      {
        resolve ? (
          <div>
            <Header as="h2" color="teal" textAlign="center">
              Reset link has been sent
            </Header>
            <Header as="h3" color="blue" textAlign="center">
              Please check your email
            </Header>
            <Message>
              Remember password?
              {' '}
              <NavLink exact to="/login">Sign In</NavLink>
            </Message>
          </div>
        ) : (
          <div>
            <Header as="h2" color="teal" textAlign="center">
              Sent Reset link to your Email
            </Header>
            <ForgotPasswordForm sendLink={sendResetLink} />
            <Message>
              Remember password?
              {' '}
              <NavLink exact to="/login">Sign In</NavLink>
            </Message>
            </div>
        )
      }
    </Grid.Column>
  </Grid>
);

ForgotPasswordPage.propTypes = {
  sendResetLink: PropTypes.func.isRequired
};

const actions = { sendResetLink };

const mapStateToProps = rootState => ({
  resolve: rootState.profile.resolve
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPage);
