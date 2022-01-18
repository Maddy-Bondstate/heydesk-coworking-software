import React, { useEffect, useState, useLayoutEffect } from 'react';

import ListProfileHeading from '../../../containers/settings/profile/ListProfileHeading';
import AddProfileModal from '../../../containers/settings/profile/AddProfileModal';

import {
  getSettingsProfileList,
  addSettingsProfile,
} from '../../../redux/actions';
import { connect } from 'react-redux';

const SpaceLocations = ({
  token,
  match,
  loading,
  profile,
  getSettingsProfileListAction,
  addSettingsProfileAction,
}) => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    getSettingsProfileListAction(token);
  }, [getSettingsProfileListAction]);

  useLayoutEffect(() => {
    if (profile) {
      setItem(profile.data);
    }
  }, [profile]);

  return loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListProfileHeading heading="menu.myprofile" match={match} />

      <AddProfileModal
        token={token}
        item={item}
        addSettingsProfileAction={addSettingsProfileAction}
      />
    </div>
  );
};

const mapStateToProps = ({ settings }) => {
  const { loading, profile, addProfile } = settings;
  return { loading, profile, addProfile };
};

export default connect(mapStateToProps, {
  getSettingsProfileListAction: getSettingsProfileList,
  addSettingsProfileAction: addSettingsProfile,
})(SpaceLocations);
