import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Image, Label, Popup, Grid, Icon } from "semantic-ui-react";
import { connect } from 'react-redux';
import moment from "moment";

import Spinner from 'src/components/Spinner';
import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from "./styles.module.scss";

const Post = ({
  post,
  deletePost,
  getLikes,
  likePost,
  dislikePost,
  postLikes,
  toggleExpandedPost,
  toggleExpandedEditPost,
  sharePost,
}) => {
  const {
    id,
    image,
    body,
    user,
    likeCount,
    dislikeCount,
    commentCount,
    createdAt,
  } = post;
  const date = moment(createdAt).fromNow();
  const likeLabel = (
    <Label
      basic
      size="small"
      as="a"
      className={styles.toolbarBtn}
      onClick={() => likePost(id)}
    >
      <Icon name="thumbs up" />
      {likeCount}
    </Label>
  );

  const handleOpen = () => {
    getLikes(id);
  };

  const handleClose = () => {
    getLikes();
  }

  const noMargin = { margin: 0 };

  return (
    <Card style={{ width: "100%" }}>
      {image && <Image src={image.link} wrapped ui={false} />}
      <Card.Content>
        <Card.Meta className={styles.heading}>
          <span className="date">
            posted by {user.username}
            {" - "}
            {date}
          </span>
          {
            toggleExpandedEditPost || deletePost ? 
            <span>
              { toggleExpandedEditPost && 
                <Label
                  basic
                  as="a"
                  floated="right"
                  size="small"
                  className={styles.toolbarBtn}
                  onClick={() => toggleExpandedEditPost(id)}
                >
                  <Icon style={noMargin} name="edit" />
                </Label>
              }
              { deletePost && 
                <Label
                  basic
                  as="a"
                  floated="right"
                  size="small"
                  className={styles.deleteBtn}
                  onClick={() => deletePost(post)}
                >
                  <Icon style={noMargin} name="delete" />
                </Label>
              }
            </span> : null
          }
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
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
            postLikes ? (
              <Grid 
                centered 
                divided 
                columns={postLikes.length > 5 ? 3 : postLikes.length || 1}
              >
                {
                  postLikes.map((like) => {
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
        <Label
          basic
          size="small"
          as="a"
          className={styles.toolbarBtn}
          onClick={() => dislikePost(id)}
        >
          <Icon name="thumbs down" />
          {dislikeCount}
        </Label>
        <Label
          basic
          size="small"
          as="a"
          className={styles.toolbarBtn}
          onClick={() => toggleExpandedPost(id)}
        >
          <Icon name="comment" />
          {commentCount}
        </Label>
        <Label
          basic
          size="small"
          as="a"
          className={styles.toolbarBtn}
          onClick={() => sharePost(id)}
        >
          <Icon name="share alternate" />
        </Label>
      </Card.Content>
    </Card>
  );
};


const mapStateToProps = rootState => ({
  postLikes: rootState.posts.postLikes
});

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  getLikes: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  toggleExpandedPost: PropTypes.func.isRequired,
  sharePost: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Post);