import React, { useState, useEffect, useLayoutEffect } from 'react';
import ListLocationHeading from '../../../containers/space/location/ListLocationHeading';
import AddLocationModal from '../../../containers/space/location/AddLocationModal';
import AddFloorModal from '../../../containers/space/location/AddFloorModal';
import ListLocationListing from '../../../containers/space/location/ListLocationListing';

import { getSpaceLocationList, addSpaceLocation } from '../../../redux/actions';
import { connect } from 'react-redux';

const pageSizes = [4, 8, 12, 20];

const SpaceLocations = ({
  match,
  location,
  loading,
  addlocation,
  getSpaceLocationListAction,
  addSpaceLocationAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [floorOpen, setFloorModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  const [modalId, setModalId] = useState(null);
  const [modalDeleteId, setModalDeleteId] = useState('');

  useEffect(() => {
    getSpaceLocationListAction();
  }, [getSpaceLocationListAction]);

  useLayoutEffect(() => {
    if (location?.data) {
      setTotalItemCount(location.data.count);
      setItems(location.data.results);
    }

    if (!modalOpen) setModalId(null);
    if (modalDeleteId !== '') {
      addSpaceLocationAction({ id: modalDeleteId }, 'DELETE');
      setModalDeleteId('');
    }
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  console.log(items);

  return loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      asdasdas dasdasasdas
      {/* <ListLocationListing
        items={items}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
        toggleModal={() => {
          return setModalOpen(!modalOpen), setModalId(modalId);
        }}
        toggleFloor={() => setFloorModalOpen(!floorOpen)}
        setModalId={setModalId}
        setModalDeleteId={setModalDeleteId}
      /> */}
    </div>
  );
};

const mapStateToProps = ({ space }) => {
  const { loading, location, addlocation } = space;
  return { location, loading, addlocation };
};

export default connect(mapStateToProps, {
  getSpaceLocationListAction: getSpaceLocationList,
  addSpaceLocationAction: addSpaceLocation,
})(SpaceLocations);
