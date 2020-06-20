import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Header } from 'semantic-ui-react';

import { toggleExpandedEditStatusProfile, editProfile } from 'src/containers/Profile/actions';
import EditStatus from 'src/components/EditStatus';
import Spinner from 'src/components/Spinner';

const ExpandedEditStatus = ({
  user,
  toggleExpandedEditStatusProfile: toggle,
  editProfile: edit
}) => (
  <Modal dimmer="blurring" centered={false} open onClose={() => toggle()}>
    {
      user ? (
        <Modal.Content>
          <Header as="h3" dividing>
            Update Status
          </Header>
          <EditStatus
            user={user}
            editStatus={edit}
            toggleOnComplete={toggle}
          />
        </Modal.Content>
      ) : <Spinner />
    }
  </Modal>
);

ExpandedEditStatus.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleExpandedEditStatusProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired
};

const mapStateToProps = rootState => ({
  user: rootState.profile.expandedEditStatusProfile
});

const actions = { editProfile, toggleExpandedEditStatusProfile };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedEditStatus);
