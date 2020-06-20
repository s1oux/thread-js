import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Header } from 'semantic-ui-react';

import { toggleExpandedEditUsernameProfile, editProfile } from 'src/containers/Profile/actions';
import EditUsername from 'src/components/EditUsername';
import Spinner from 'src/components/Spinner';

const ExpandedEditUsername = ({
  user,
  error,
  toggleExpandedEditUsernameProfile: toggle,
  editProfile: edit
}) => (
  <Modal dimmer="blurring" centered={false} open onClose={() => toggle()}>
    {
      user ? (
        <Modal.Content>
          <Header as="h3" dividing>
            Update Username
          </Header>
          <EditUsername
            user={user}
            editUsername={edit}
            toggleOnComplete={toggle}
            error={error}
          />
        </Modal.Content>
      ) : <Spinner />
    }
  </Modal>
);

ExpandedEditUsername.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleExpandedEditUsernameProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  user: rootState.profile.expandedEditUsernameProfile,
  error: rootState.profile.error
});

const actions = { editProfile, toggleExpandedEditUsernameProfile };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedEditUsername);
