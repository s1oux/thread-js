import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { toggleExpandedEditPost, editPost } from 'src/containers/Thread/actions';
import EditPost from 'src/components/EditPost';
import Spinner from 'src/components/Spinner';

const ExpandedEditPost = ({
  post,
  uploadImage,
  toggleExpandedEditPost: toggle,
  editPost: edit
}) => (
  <Modal dimmer="blurring" centered={false} open onClose={() => toggle()}>
    {post
      ? (
        <Modal.Content>
            <EditPost
                post={post}
                editPost={edit}
                uploadImage={uploadImage}
                toggleOnComplete={toggle}
            />
        </Modal.Content>
      )
      : <Spinner />}
  </Modal>
);

ExpandedEditPost.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleExpandedEditPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  post: rootState.posts.expandedEditPost
});

const actions = { editPost, toggleExpandedEditPost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedEditPost);
