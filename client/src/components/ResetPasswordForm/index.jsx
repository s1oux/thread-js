import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment } from 'semantic-ui-react';

const ResetPasswordForm = ({ user, resetPassword }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const passwordChanged = data => {
    setPassword(data);
    setIsPasswordValid(true);
  };

  const handleResetPasswordClick = async () => {
    const isValid = isPasswordValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(user, password);
    } catch {
      // TODO: show error
      setIsLoading(false);
    }
  };

  return (
    <Form
      name="sendResetLinkForm"
      size="large"
      onSubmit={handleResetPasswordClick}
    >
      <Segment>
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          error={!isPasswordValid}
          onChange={ev => passwordChanged(ev.target.value)}
          onBlur={() => setIsPasswordValid(Boolean(password))}
        />
        <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
          Reset Password
        </Button>
      </Segment>
    </Form>
  );
};

ResetPasswordForm.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

export default ResetPasswordForm;
