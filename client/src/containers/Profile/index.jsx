import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Image,
  Input
} from 'semantic-ui-react';

import ExpandedEditImage from '../ExpandedEditImage';
import ExpandedEditUsername from '../ExpandedEditUsername';
import * as imageService from "src/services/imageService";
import { getUserImgLink } from 'src/helpers/imageHelper';
import {
  toggleExpandedEditImageProfile,
  toggleExpandedEditUsernameProfile
} from './actions';

const Profile = ({
  user,
  expandedEditImageProfile,
  expandedEditUsernameProfile,
  toggleExpandedEditImageProfile: toggleImage,
  toggleExpandedEditUsernameProfile: toggleUsername
}) => {
  const [active, setActive] = useState(false);

  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);

  const uploadImage = (file) => imageService.uploadImage(file);

  const handleUpdateUserImage = () => {
    console.log('user image needs update');
  };

  const handleUpdateUsername = () => {
    console.log('username needs update');
  }

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Column>
        <Dimmer.Dimmable 
          as={Image} 
          size="medium"
          centered
          circular
          blurring
          dimmed={active}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
        >
          <Image 
            centered 
            src={getUserImgLink(user.image)} 
            size="medium" 
            circular 
          />
          <Dimmer active={active}>
            <Header as='h3' inverted>
              Update Image
            </Header>

            <Button inverted onClick={toggleImage}>Update</Button>
          </Dimmer>
        </Dimmer.Dimmable>
        
        <br />
        <br />
        <Input
          icon="user"
          iconPosition="left"
          placeholder="Username"
          type="text"
          disabled
          value={user.username}
          label={<Button icon="edit" onClick={toggleUsername}></Button>}
          labelPosition="right"
        />
        <br />
        <br />
        <Input
          icon="at"
          iconPosition="left"
          placeholder="Email"
          type="email"
          disabled
          value={user.email}
        />
      </Grid.Column>
      {expandedEditImageProfile && <ExpandedEditImage uploadImage={uploadImage} />}
      {expandedEditUsernameProfile && <ExpandedEditUsername />}
    </Grid>
  );
}

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  expandedEditImageProfile: PropTypes.objectOf(PropTypes.any),
  expandedEditUsernameProfile: PropTypes.objectOf(PropTypes.any),
  toggleExpandedEditImageProfile: PropTypes.func.isRequired,
  toggleExpandedEditUsernameProfile: PropTypes.func.isRequired
};

Profile.defaultProps = {
  user: {},
  expandedEditImageProfile: undefined,
  expandedEditUsernameProfile: undefined
};

const mapStateToProps = rootState => ({
  user: rootState.profile.user,
  expandedEditImageProfile: rootState.profile.expandedEditImageProfile,
  expandedEditUsernameProfile: rootState.profile.expandedEditUsernameProfile
});

const actions = {
  toggleExpandedEditImageProfile,
  toggleExpandedEditUsernameProfile
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
