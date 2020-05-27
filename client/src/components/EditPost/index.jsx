import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Image, Segment } from 'semantic-ui-react';

import styles from './styles.module.scss';

const EditPost = ({
    post,
  editPost,
  uploadImage,
  toggleOnComplete
}) => {
  const [body, setBody] = useState(post.body);
  const [image, setImage] = useState(post.image || undefined);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditPost = async () => {
    if (!body) {
      return;
    }
    await editPost({ id: post.id, imageId: image?.imageId, body });
    setBody('');
    setImage(undefined);
    toggleOnComplete();
  };

  const handleUploadFile = async ({ target }) => {
    setIsUploading(true);
    try {
      const { id: imageId, link: imageLink } = await uploadImage(target.files[0]);
      setImage({ imageId, imageLink });
    } finally {
      // TODO: show error
      setIsUploading(false);
    }
  };

  return (
    <Segment>
      <Form onSubmit={handleEditPost}>
        {
          image?.link && (
            <div className={styles.imageWrapper}>
              <Image className={styles.image} src={image?.link} alt="post" />
            </div>
          )
        }
        <Form.TextArea
          name="body"
          value={body}
          placeholder="What is the news?"
          onChange={ev => setBody(ev.target.value)}
        />
        {image?.imageLink && (
          <div className={styles.imageWrapper}>
            <Image className={styles.image} src={image?.imageLink} alt="post" />
          </div>
        )}
        <Button color="teal" icon labelPosition="left" as="label" loading={isUploading} disabled={isUploading}>
          <Icon name="image" />
          Attach image
          <input name="image" type="file" onChange={handleUploadFile} hidden />
        </Button>
        <Button floated="right" color="blue" type="submit">Edit</Button>
      </Form>
    </Segment>
  );
};

EditPost.propTypes = {
    post:  PropTypes.objectOf(PropTypes.any).isRequired,
  editPost: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  toggleOnComplete: PropTypes.func.isRequired
};

export default EditPost;
