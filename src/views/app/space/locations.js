import React, { useState, useEffect } from 'react';
import ListLocationHeading from '../../../containers/space/location/ListLocationHeading';
import AddLocationModal from '../../../containers/space/location/AddLocationModal';
import AddFloorModal from '../../../containers/space/location/AddFloorModal';
import ListLocationListing from '../../../containers/space/location/ListLocationListing';
import SingleLocationPg from '../../../containers/space/location/SingleLocationPg';

import { getSpaceLocationList, SingleSpace,LocSingleFloor } from '../../../redux/actions';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
const pageSizes = [4, 8, 12, 20];

const SpaceLocations = ({
  match,
  location,
  loading,
  single_space,
  single_floor,
  getSpaceLocationListAction,
  SingleSpaceAction,
  LocSingleFloorAction
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
  const [locat, setLocat] = useState({});
  const [loc_id, setLocId] = useState("");
  const [floor, setfloor] = useState({});

  const location_l = useLocation();
  const getParams = location_l.search;

  const paramsString = getParams;
  let searchParams = new URLSearchParams(paramsString);
  const space_id = searchParams.get('p');
  console.log('test',loc_id);
  useEffect(() => {
    
    // if(loc_id){
    //   SingleSpaceAction(loc_id);
    //   if (edit_locat?.data) setLocat(edit_locat.data);
    // }
    // if(loc_id){
    //   LocSingleFloorAction(loc_id);
    //   if (single_floor?.data) setfloor(single_floor.data);

    // }
    if (space_id && space_id !== '') {
      SingleSpaceAction(space_id);
      if (single_space?.data) setItem(single_space.data);
    } else {
      getSpaceLocationListAction();
      if (location?.data) setTotalItemCount(location.data.count);
      if (location?.data?.results) setItems(location.data.results);
    }
  }, [getSpaceLocationListAction, SingleSpaceAction,space_id]);

  /* edit location */
  const UpdateLocat = async (loct_id) => {
  
    setModalOpen(!modalOpen);
    setLocId(loct_id);
    await
    SingleSpaceAction(loct_id);
    if (single_space?.data) setLocat(single_space.data);
    console.log('set',locat);
    
  };

  /* Edit foor */
  const UpdateFloor = async (loct_id) => {
  
    setFloorModalOpen(!floorOpen)
    setLocId(loct_id);
    await
    LocSingleFloorAction(loct_id);
    if (single_floor?.data) setfloor(single_floor.data);
    console.log('get',locat);
    
  };
  
 
  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;
console.log('data',locat);
console.log('item',item);
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
        loc_id = {loc_id}
        locat={locat} 
      />

      <AddFloorModal
        modelTitle="space.add-floor"
        modalOpen={floorOpen}
        toggleModal={() => setFloorModalOpen(!floorOpen)}
        loc_id = {loc_id}
        floor = {floor}
      />

      {space_id && space_id !== '' ? (
        <SingleLocationPg item={item} 
        // toggleModal={(loc_id) => { return setModalOpen(!modalOpen),setLocId(loc_id)}}
        toggleModal={(loc_id) =>  UpdateLocat( loc_id ) } 
        toggleFloor={(loc_id) =>  UpdateFloor(loc_id)}
        // toggleFloor={(loc_id) => { return setFloorModalOpen(!floorOpen),setLocId(loc_id)}}
        />
      ) : (
        <ListLocationListing
          items={items}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          toggleModal={(loc_id) =>  UpdateLocat( loc_id ) } 
          toggleFloor={(loc_id) =>  UpdateFloor(loc_id)}
          //toggleModal={(loc_id) => { return setModalOpen(!modalOpen),setLocId(loc_id)}}
          // toggleFloor={(loc_id) => { return setFloorModalOpen(!floorOpen),setLocId(loc_id)}}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ space }) => {
  
  const { location, single_space,edit_locat,single_floor, loading } = space;
  return { location, single_space,edit_locat,single_floor, loading };
};

export default connect(mapStateToProps, {
  getSpaceLocationListAction: getSpaceLocationList,
  SingleSpaceAction: SingleSpace,
  LocSingleFloorAction : LocSingleFloor
})(SpaceLocations);
