import React, { useState, useEffect } from 'react';
import ListLocationHeading from '../../../containers/space/location/ListLocationHeading';
import AddLocationModal from '../../../containers/space/location/AddLocationModal';
import AddFloorModal from '../../../containers/space/location/AddFloorModal';
import ListLocationListing from '../../../containers/space/location/ListLocationListing';
import SingleLocationPg from '../../../containers/space/location/SingleLocationPg';

import { getSpaceLocationList } from '../../../redux/actions';
import { connect } from 'react-redux';

const pageSizes = [4, 8, 12, 20];

const SpaceLocations = ({
  match,
  location,
  loading,
  getSpaceLocationListAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [floorOpen, setFloorModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSpaceLocationListAction();
    if (location?.data) setTotalItemCount(location.data.count);
    if (location?.data?.results) setItems(location.data.results);
  }, [getSpaceLocationListAction]);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const url = window.location.href;
  //console.log(url);
  //const space_id = (url.substring(url.lastIndexOf('=') + 1));
  var space_id = url.substring(url.indexOf("=") + 1);
  var split = url .split( '?' );
  var lenspace = split.length;

 
  
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
      {lenspace>1?
          <SingleLocationPg
          space_id = {space_id}
          />
        :

          <ListLocationListing
          items={items}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          toggleModal={() => setModalOpen(!modalOpen)}
          toggleFloor={() => setFloorModalOpen(!floorOpen)}
          />
      }
    </div>
  );
};

const mapStateToProps = ({ space }) => {
 // console.log('location',space);
  const { location, loading } = space;
  return { location, loading };
};

export default connect(mapStateToProps, {
  getSpaceLocationListAction: getSpaceLocationList,
})(SpaceLocations);
