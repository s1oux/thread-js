import React from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentUI, Label, Image, Popup, Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';

import Spinner from 'src/components/Spinner';
import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';
 
const Comment = ({
  getLikes,
  commentLikes,
  likeComment,
  dislikeComment,
  deleteComment,
  toggleExpandedEditComment,
  comment
}) => {
  const {
    id,
    body,
    likeCount,
    dislikeCount,
    createdAt,
    user
  } = comment;

  const likeLabel = (
    <CommentUI.Action
      size="small"
      as="a"
      className={styles.toolbarBtn}
      onClick={() => likeComment(id)}
    >
      <Icon name="thumbs up" />
      {likeCount}
    </CommentUI.Action>
  );

  const handleOpen = () => {
    getLikes(id);
  };

  const handleClose = () => {
    getLikes();
  };

  const noMargin = { margin: 0 };

  return (
    <CommentUI className={styles.comment}>
      <CommentUI.Avatar src={getUserImgLink(user.image)} />
      <CommentUI.Content>
        <div  className={styles.heading}>
          <span>
            <CommentUI.Author as="a">
              {user.username}
            </CommentUI.Author>
            <CommentUI.Metadata>
              {user.status}
            </CommentUI.Metadata>
            <CommentUI.Metadata>
              {moment(createdAt).fromNow()}
            </CommentUI.Metadata>
          </span>
          <CommentUI.Metadata>
            {
              toggleExpandedEditComment || deleteComment ? (
                <span>
                  { toggleExpandedEditComment && 
                    <Label
                      basic
                      as="a"
                      floated="right"
                      size="small"
                      className={styles.toolbarBtn}
                      onClick={() => toggleExpandedEditComment(id)}
                    >
                      <Icon style={noMargin} name="edit" />
                    </Label>
                  }
                  { deleteComment && 
                    <Label
                      basic
                      as="a"
                      floated="right"
                      size="small"
                      className={styles.deleteBtn}
                      onClick={() => deleteComment(comment)}
                    >
                      <Icon style={noMargin} name="delete" />
                    </Label>
                  }
                </span>
              ) : null
            }
          </CommentUI.Metadata>
        </div>
        <CommentUI.Text>
          {body}
        </CommentUI.Text>
        <CommentUI.Actions>
          <Popup
            trigger={likeLabel}
            inverted
            basic
            mouseEnterDelay={500}
            mouseLeaveDelay={500}
            on="hover"
            onOpen={handleOpen}
            onClose={handleClose}
          >
            {
              commentLikes ? (
                <Grid 
                  centered 
                  divided 
                  columns={
                    commentLikes.length > 5 ? 3 : commentLikes.length || 1
                  }
                >
                  {
                    commentLikes.map((like) => {
                      return (
                        <Grid.Column textAlign="center" key={like.id}>    
                          <Image
                            src={getUserImgLink(like.user.image)}
                            avatar
                          />                      
                        </Grid.Column>
                      );
                    })
                  }
                </Grid>
              ) : <Spinner />
            }
          </Popup>
          <CommentUI.Action
            size="small"
            as="a"
            className={styles.toolbarBtn}
            onClick={() => dislikeComment(id)}
          >
            <Icon name="thumbs down" />
            {dislikeCount}
          </CommentUI.Action>
          
        </CommentUI.Actions>
      </CommentUI.Content>
    </CommentUI>
  );
}

const mapStateToProps = rootState => ({
  commentLikes: rootState.posts.commentLikes
});

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(mapStateToProps)(Comment);
