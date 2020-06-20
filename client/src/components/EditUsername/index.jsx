import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Segment } from 'semantic-ui-react';

const EditUsername = ({
  user,
  error,
  editUsername,
  toggleOnComplete
}) => {
  
  const [username, setUsername] = useState(user.username || '');
  const [isUsernameValid, setUsernameValid] = useState(true);

  const handleEditUsername = async () => {
    const isValid = isUsernameValid;
    if (!isValid) {
      return;
    }
    const updatedUser = {
      ...user,
      username
    }
    await editUsername(updatedUser);
    
    setUsername('');
    toggleOnComplete();
  };

  const usernameChanged = value => {
    setUsername(value);
    setUsernameValid(true);
  };
  
  const errorContent = !isUsernameValid ? (
    'Username should not be empty'
  ) : (
    error ? 'Username has already been taken' : ''
  );

  return (
    <Form onSubmit={handleEditUsername}>
      <Segment>
        <Form.Group widths="equal">
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="Username"
            type="text"
            error={error || ! isUsernameValid ? {
              content: errorContent,
              pointing: 'below'
            } : false}
            value={username}
            onChange={ev => usernameChanged(ev.target.value)}
            onBlur={() => setUsernameValid(Boolean(username))}
          />
          <Button fluid labelPosition="left" as="button" icon type="submit">
            <Icon name="edit" />
            Update
          </Button>
        </Form.Group>
      </Segment>    
    </Form>
  );
};

EditUsername.propTypes = {
  user:  PropTypes.objectOf(PropTypes.any).isRequired,
  editUsername: PropTypes.func.isRequired,
  toggleOnComplete: PropTypes.func.isRequired
};

export default EditUsername;
