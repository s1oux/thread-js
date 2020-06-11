import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Header } from 'semantic-ui-react';

import { toggleExpandedEditImageProfile, editProfile } from 'src/containers/Profile/actions';
import EditImage from 'src/components/EditImage';
import Spinner from 'src/components/Spinner';

const ExpandedEditImage = ({
  user,
  uploadImage,
  toggleExpandedEditImageProfile: toggle,
  editProfile: edit
}) => (
  <Modal dimmer="blurring" centered={false} open onClose={() => toggle()}>
    {
      user ? (
        <Modal.Content>
          <Header as="h3" dividing>
            Update Image
          </Header>
          <EditImage
            user={user}
            editImage={edit}
            uploadImage={uploadImage}
            toggleOnComplete={toggle}
          />
        </Modal.Content>
      ) : <Spinner />
    }
  </Modal>
);

ExpandedEditImage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleExpandedEditImageProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  user: rootState.profile.expandedEditImageProfile
});

const actions = { editProfile, toggleExpandedEditImageProfile };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedEditImage);
