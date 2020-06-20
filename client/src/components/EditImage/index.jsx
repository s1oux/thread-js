import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Image, Segment } from 'semantic-ui-react';

import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';

const EditImage = ({
  user,
  editImage,
  uploadImage,
  toggleOnComplete
}) => {
  
  const [image, setImage] = useState(user.image || undefined);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditImage = async () => {
    const updatedUser = {
      ...user,
      imageId: image.imageId
    }
    await editImage(updatedUser);
    
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
      <Form onSubmit={handleEditImage}>
        {
          image?.imageLink ? (
            <div className={styles.imageWrapper}>
              <Image 
                centered
                className={styles.image} 
                src={image?.imageLink} 
                alt="user" 
                size="medium"
                circular
              />
            </div>
          ) : (
            <Image 
              centered 
              src={getUserImgLink(user.image)} 
              size="medium" 
              circular 
            />
          )
        }
        
        <Button color="teal" icon labelPosition="left" as="label" loading={isUploading} disabled={isUploading}>
          <Icon name="image" />
          Attach image
          <input name="image" type="file" onChange={handleUploadFile} hidden />
        </Button>
        <Button floated="right" color="blue" type="submit">Update</Button>
      </Form>
    </Segment>
  );
};

EditImage.propTypes = {
  user:  PropTypes.objectOf(PropTypes.any).isRequired,
  editImage: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  toggleOnComplete: PropTypes.func.isRequired
};

export default EditImage;
