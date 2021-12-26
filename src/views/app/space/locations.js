import React, { useState, useEffect, useLayoutEffect } from 'react';
import ListLocationHeading from '../../../containers/space/location/ListLocationHeading';
import AddLocationModal from '../../../containers/space/location/AddLocationModal';
import AddFloorModal from '../../../containers/space/location/AddFloorModal';
import ListLocationListing from '../../../containers/space/location/ListLocationListing';

import {
  getSpaceLocationList,
  addSpaceLocation,
  addSpaceLocationFloor,
} from '../../../redux/actions';
import { connect } from 'react-redux';

const pageSizes = [4, 8, 12, 20];

const SpaceLocations = ({
  match,
  token,
  location,
  loading,
  addlocation,
  addLocationFloor,
  getSpaceLocationListAction,
  addSpaceLocationAction,
  addSpaceLocationFloorAction,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [floorOpen, setFloorModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  const [modalId, setModalId] = useState(null);
  const [modalIds, setModalIds] = useState(null);
  const [modalDeleteId, setModalDeleteId] = useState('');
  const [modalDeleteIds, setModalDeleteIds] = useState(false);
  const [modalDeleteIdsrr, setModalDeleteIdsrr] = useState(false);
  const [modalDeleteIdsrrrrrrrr, setModalDeleteIdsrrrrrrrr] = useState(false);
  // const [fetchSpace, setFetchSpace] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    getSpaceLocationListAction(token);
  }, [getSpaceLocationListAction, token]);

  const handleGetSpaceLocation = () => {
    getSpaceLocationListAction(token);
  };

  const setModalDeleteIdsppppp = (id) => {
    addSpaceLocationFloorAction({ id }, token, 'DELETE');
    setModalDeleteIds(true);
    setModalDeleteIdsrrrrrrrr(true);

    setTimeout(() => {
      setModalDeleteIdsrrrrrrrr(false);
    }, 100);
  };

  const setModalDeleteIdsp = (id) => {
    addSpaceLocationAction({ id }, token, 'DELETE');
    setModalDeleteId(true);
    setModalDeleteIdsrr(true);

    setTimeout(() => {
      setModalDeleteIdsrr(false);
    }, 100);
  };

  useLayoutEffect(() => {
    if (location?.data) {
      setTotalItemCount(location.data.count);
      setItems(location.data.results);
      setIsLoaded(true);
    }

    if (!loading) {
      // console.log('++++++++++++++++++++++');
      if (addLocationFloor && modalDeleteIds) {
        handleGetSpaceLocation();
        setModalDeleteIds(false);
      } else if (addlocation && modalDeleteId) {
        handleGetSpaceLocation();
        setModalDeleteId(false);
      }
    }
  }, [
    location,
    // modalOpen,
    // floorOpen,
    modalDeleteId,
    modalDeleteIds,
    addSpaceLocationAction,
    // addSpaceLocationFloorAction,
    token,
    handleGetSpaceLocation,
    loading,
    addlocation,
    addLocationFloor,
  ]);

  const handleToggleModel = () => {
    setModalOpen(!modalOpen);
    setModalId(null);
  };

  const handleToggleFloorModel = () => {
    setFloorModalOpen(!floorOpen);
    setModalIds(null);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListLocationHeading
        heading="menu.locations"
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={totalItemCount}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        itemsLength={items ? items.length : 0}
        onSearchKey={(e) => {
          if (e.key === 'Enter') {
            setSearch(e.target.value.toLowerCase());
          }
        }}
        pageSizes={pageSizes}
        toggleModal={handleToggleModel}
        toggleFloor={handleToggleFloorModel}
      />

      <AddLocationModal
        modelTitle="space.add-location"
        modalOpen={modalOpen}
        toggleModal={handleToggleModel}
        item={modalId}
        token={token}
        handleGetSpaceLocation={handleGetSpaceLocation}
        modalDeleteIdsw={modalDeleteIdsrr}
        setModalDeleteIdsrrw={setModalDeleteIdsrr}
      />
      {items?.length > 0 && (
        <AddFloorModal
          modelTitle="space.add-floor"
          modalOpen={floorOpen}
          toggleModal={handleToggleFloorModel}
          item={modalIds}
          locationList={items}
          token={token}
          handleGetSpaceLocation={handleGetSpaceLocation}
          modalDeleteIdsq={modalDeleteIdsrrrrrrrr}
          setModalDeleteIdsrrq={setModalDeleteIdsrrrrrrrr}
        />
      )}
      <ListLocationListing
        items={items}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
        toggleModal={handleToggleModel}
        toggleFloor={handleToggleFloorModel}
        setModalId={setModalId}
        setModalIds={setModalIds}
        setModalDeleteId={setModalDeleteIdsp}
        setModalDeleteIds={setModalDeleteIdsppppp}
      />
    </div>
  );
};

const mapStateToProps = ({ space }) => {
  const { loading, location, addlocation, addLocationFloor } = space;
  return { location, loading, addlocation, addLocationFloor };
};

export default connect(mapStateToProps, {
  getSpaceLocationListAction: getSpaceLocationList,
  addSpaceLocationAction: addSpaceLocation,
  addSpaceLocationFloorAction: addSpaceLocationFloor,
})(SpaceLocations);
