import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Header } from 'semantic-ui-react';

import { toggleExpandedEditComment, editComment } from 'src/containers/Thread/actions';
import EditComment from 'src/components/EditComment';
import Spinner from 'src/components/Spinner';

const ExpandedEditComment = ({
  comment,
  toggleExpandedEditComment: toggle,
  editComment: edit
}) => (
  <Modal dimmer="blurring" open onClose={() => toggle()}>
    {
        comment ? (
            <Modal.Content>
                <Header as="h3" dividing>
                    Edit Comment
                </Header>
                <EditComment
                    comment={comment}
                    editComment={edit}
                    toggleOnComplete={toggle}
                />
            </Modal.Content>
        ) : <Spinner />
    }
  </Modal>
);

ExpandedEditComment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleExpandedEditComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  comment: rootState.posts.expandedEditComment
});

const actions = { editComment, toggleExpandedEditComment };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedEditComment);
