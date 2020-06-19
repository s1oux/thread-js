import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Form, Button, Segment } from 'semantic-ui-react';

const ForgotPasswordForm = ({ sendLink }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailChanged = data => {
    setEmail(data);
    setIsEmailValid(true);
  };


  const handleSendClick = async () => {
    const isValid = isEmailValid;
    if (!isValid || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await sendLink(email, `${window.location.origin}`);
    } catch {
      // TODO: show error
      setIsLoading(false);
    }
  };

  return (
    <Form name="sendResetLinkForm" size="large" onSubmit={handleSendClick}>
      <Segment>
        <Form.Input
          fluid
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          error={!isEmailValid}
          onChange={ev => emailChanged(ev.target.value)}
          onBlur={() => setIsEmailValid(validator.isEmail(email))}
        />
        <Button type="submit" color="teal" fluid size="large" loading={isLoading} primary>
          Send Reset Link
        </Button>
      </Segment>
    </Form>
  );
};

ForgotPasswordForm.propTypes = {
  sendLink: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
