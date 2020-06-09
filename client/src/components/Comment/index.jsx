import React from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentUI, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';
 
const Comment = ({ toggleExpandedEditComment, comment: { id, body, createdAt, user }}) => (
  <CommentUI className={styles.comment}>
    <CommentUI.Avatar src={getUserImgLink(user.image)} />
    <CommentUI.Content>
      <CommentUI.Author as="a">
        {user.username}
      </CommentUI.Author>
      <CommentUI.Metadata>
        {moment(createdAt).fromNow()}
      </CommentUI.Metadata>
      <CommentUI.Text>
        {body}
      </CommentUI.Text>
      {
        toggleExpandedEditComment ? (
          <CommentUI.Action 
            size="small"
            className={styles.toolbarBtn}
            onClick={() => toggleExpandedEditComment(id)} 
          >
            <Icon name="edit" /> Edit
          </CommentUI.Action>
        ) : null
      }
    </CommentUI.Content>
  </CommentUI>
);

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Comment;
