import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getUserImgLink } from 'src/helpers/imageHelper';
import { Header as HeaderUI, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';

import ExpandedEditStatus from 'src/containers/ExpandedEditStatus';

import styles from './styles.module.scss';

const Header = ({
  user,
  logout,
  showStatus,
  toggleStatus,
  toggleStatusChange,
  expandedEditStatusProfile
}) => (
  <div className={styles.headerWrp}>
    <Grid centered container columns="2">
      <Grid.Column>
        {user && (
          <div>
            <NavLink exact to="/">
              <HeaderUI>
                <Image circular src={getUserImgLink(user.image)} />
                {' '}
                {user.username}
              </HeaderUI>
            </NavLink>
            <div className={styles.status}>
              {
                showStatus ? (
                  <div>
                    <Label 
                      size="mini"
                      color="grey"
                    >
                        {user.status ? `${user.status}` : 'no status'}
                    </Label>
                    <Label
                      as='a'
                      size="mini"
                      tag
                      onClick={() => toggleStatusChange(user)}
                    >
                      <Icon name="edit outline" />
                    </Label>
                    <Label 
                      as='a'
                      size="mini"
                      tag
                      className={styles.toggleBtn}
                      onClick={toggleStatus}
                    >
                      <Icon inverted name="eye slash outline" />
                    </Label>
                  </div>
                ) : (
                  <Label
                    as='a'
                    size="mini"
                    tag
                    className={styles.toggleBtn}
                    onClick={toggleStatus}
                  >
                    <Icon inverted name="eye" />
                  </Label>
                )
              }
            </div>
          </div>
        )}
      </Grid.Column>
      <Grid.Column textAlign="right">
        <NavLink exact activeClassName="active" to="/profile" className={styles.menuBtn}>
          <Icon name="user circle" size="large" />
        </NavLink>
        <Button basic icon type="button" className={`${styles.menuBtn} ${styles.logoutBtn}`} onClick={logout}>
          <Icon name="log out" size="large" />
        </Button>
      </Grid.Column>
    </Grid>
    {expandedEditStatusProfile && <ExpandedEditStatus />}
  </div>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Header;
