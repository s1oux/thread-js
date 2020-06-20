import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Segment } from 'semantic-ui-react';

const EditStatus = ({
  user,
  editStatus,
  toggleOnComplete
}) => {
  
  const [status, setStatus] = useState(user.status || '');

  const handleEditStatus = async () => {
    const updatedUser = {
      ...user,
      status
    }
    await editStatus(updatedUser);
    
    setStatus('');
    toggleOnComplete();
  };

  const handleStatusChange = event => {
    setStatus(event.target.value);
  };
  
  return (
    <Form onSubmit={handleEditStatus}>
      <Segment>
        <Form.Group widths="equal">
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="Status"
            type="text"
            value={status}
            onChange={handleStatusChange}
          />      
          <Button 
            fluid
            labelPosition="left"
            as="button"
            icon
            type="submit"
          >
            <Icon name="edit" />
            Update
          </Button>
        </Form.Group>
      </Segment>    
    </Form>
  );
};

EditStatus.propTypes = {
  user:  PropTypes.objectOf(PropTypes.any).isRequired,
  editStatus: PropTypes.func.isRequired,
  toggleOnComplete: PropTypes.func.isRequired
};

export default EditStatus;
