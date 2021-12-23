import React, { useEffect, useState, useLayoutEffect } from 'react';

import ListProfileHeading from '../../../containers/settings/profile/ListProfileHeading';
import AddProfileModal from '../../../containers/settings/profile/AddProfileModal';
import ListProfileListing from '../../../containers/settings/profile/ListProfileListing';

import {
  getSettingsProfileList,
  addSettingsProfile,
} from '../../../redux/actions';
import { connect } from 'react-redux';

const SpaceLocations = ({
  match,
  loading,
  profile,
  getSettingsProfileListAction,
  addSettingsProfileAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState([]);
  useEffect(() => {
    getSettingsProfileListAction();
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
        modelTitle="pages.edit-profile"
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        item={item}
        addSettingsProfileAction={addSettingsProfileAction}
      />

      <ListProfileListing
        item={item}
        toggleModal={() => setModalOpen(!modalOpen)}
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
