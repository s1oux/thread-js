import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment } from 'semantic-ui-react';

const EditComment = ({
    comment,
  editComment,
  toggleOnComplete
}) => {
  const [body, setBody] = useState(comment.body);
  
  const handleEditComment = async () => {
    if (!body) {
      return;
    }
    await editComment({ id: comment.id, body });
    setBody('');
    toggleOnComplete();
  };

  return (
    <Segment>
      <Form onSubmit={handleEditComment}>
        <Form.TextArea
          name="body"
          value={body}
          placeholder="What's changing?"
          onChange={ev => setBody(ev.target.value)}
        />
        <Button type="submit" content="Edit" labelPosition="left" icon="edit" primary />
      </Form>
    </Segment>
  );
};

EditComment.propTypes = {
    comment:  PropTypes.objectOf(PropTypes.any).isRequired,
  editComment: PropTypes.func.isRequired,
  toggleOnComplete: PropTypes.func.isRequired
};

export default EditComment;
