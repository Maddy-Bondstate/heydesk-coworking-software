import React, { useState, useEffect } from 'react';
import ListLocationHeading from '../../../containers/space/location/ListLocationHeading';
import AddLocationModal from '../../../containers/space/location/AddLocationModal';
import AddFloorModal from '../../../containers/space/location/AddFloorModal';
import ListLocationListing from '../../../containers/space/location/ListLocationListing';
import SingleLocationPg from '../../../containers/space/location/SingleLocationPg';

import { getSpaceLocationList, SingleSpace } from '../../../redux/actions';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
const pageSizes = [4, 8, 12, 20];

const SpaceLocations = ({
  match,
  location,
  loading,
  single_space,
  getSpaceLocationListAction,
  SingleSpaceAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [floorOpen, setFloorModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  const location_l = useLocation();
  const getParams = location_l.search;

  const paramsString = getParams;
  let searchParams = new URLSearchParams(paramsString);
  const space_id = searchParams.get('p');

  useEffect(() => {
    if (space_id && space_id !== '') {
      SingleSpaceAction(space_id);
      if (single_space?.data) setItem(single_space.data);
    } else {
      getSpaceLocationListAction();
      if (location?.data) setTotalItemCount(location.data.count);
      if (location?.data?.results) setItems(location.data.results);
    }
  }, [getSpaceLocationListAction, SingleSpaceAction, space_id]);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return loading ? (
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
        toggleModal={() => setModalOpen(!modalOpen)}
        toggleFloor={() => setFloorModalOpen(!floorOpen)}
      />
      <AddLocationModal
        modelTitle="space.add-location"
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
      />

      <AddFloorModal
        modelTitle="space.add-floor"
        modalOpen={floorOpen}
        toggleModal={() => setFloorModalOpen(!floorOpen)}
      />

      {space_id && space_id !== '' ? (
        <SingleLocationPg item={item} />
      ) : (
        <ListLocationListing
          items={items}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          toggleModal={() => setModalOpen(!modalOpen)}
          toggleFloor={() => setFloorModalOpen(!floorOpen)}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ space }) => {
  const { location, single_space, loading } = space;
  return { location, single_space, loading };
};

export default connect(mapStateToProps, {
  getSpaceLocationListAction: getSpaceLocationList,
  SingleSpaceAction: SingleSpace,
})(SpaceLocations);
