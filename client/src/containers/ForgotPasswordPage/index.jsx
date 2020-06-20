import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Header, Message, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { sendResetLink, resetResolve } from 'src/containers/Profile/actions';
import Logo from 'src/components/Logo';
import ForgotPasswordForm from 'src/components/ForgotPasswordForm';

const ForgotPasswordPage = ({ sendResetLink, resetResolve, resolve }) => {
  const content = (
    resolve ? (
      resolve.notfound ? (
        <div>
          <Header as="h2" color="teal" textAlign="center">
            User with such email was not found
          </Header>
          <Header as="h3" color="blue" textAlign="center">
            Check an email to be defined created properly
          </Header>
          <Message>
            Want to try again?
            {' '}
            <Label
              as='a'
              basic
              onClick={() => resetResolve()}
            >
              Reset Password
            </Label>
          </Message>
        </div>
      ) : (
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
      )
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
  );

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo />
        {content}
      </Grid.Column>
    </Grid>
  );
};

ForgotPasswordPage.defaultProps = {
  resolve: undefined
};


ForgotPasswordPage.propTypes = {
  sendResetLink: PropTypes.func.isRequired,
  resetResolve: PropTypes.func.isRequired
};

const actions = { sendResetLink, resetResolve };

const mapStateToProps = rootState => ({
  resolve: rootState.profile.resolve
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPage);
