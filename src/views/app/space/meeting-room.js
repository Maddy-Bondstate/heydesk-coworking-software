import React, { useState, useEffect, useLayoutEffect } from 'react';
import ListMeetingRoomHeading from '../../../containers/space/meeting-room/ListMeetingRoomHeading';
import AddMeetingRoomModal from '../../../containers/space/meeting-room/AddMeetingRoomModal';
import ListMeetingRoomListing from '../../../containers/space/meeting-room/ListMeetingRoomListing';

import {
  getSpaceMeetingList,
  addSpaceMeeting,
  getSpaceLocationList,
} from '../../../redux/actions';
import { connect } from 'react-redux';

const pageSizes = [4, 8, 12, 20];

const SpaceMeetingRoom = ({
  match,
  token,
  initialLoad,
  // loading,
  location,
  meeting,
  getSpaceMeetingListAction,
  addSpaceMeetingAction,
  getSpaceLocationListAction,
}) => {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [modalDeleteId, setModalDeleteId] = useState('');
  const [modalDelete_H, setModalDelete_H] = useState(false);

  useEffect(() => {
    // setIsLoaded(false);
    const data = {
      type: initialLoad.type,
    };
    getSpaceMeetingListAction(data, token);
    getSpaceLocationListAction(token);
  }, [
    getSpaceMeetingListAction,
    getSpaceLocationListAction,
    token,
    initialLoad,
  ]);

  const handleGetSpaceMeeting = () => {
    const data = {
      type: initialLoad.type,
    };
    getSpaceMeetingListAction(data, token);
  };

  useLayoutEffect(() => {
    if (!modalOpen) setDataEdit(null);

    if (meeting?.data) {
      setItems(meeting.data.results);
      // setIsLoaded(true);
    }

    if (location?.data) {
      setLocationData(location.data.results);
    }

    // if (modalDeleteId !== '') {
    //   const data = { id: modalDeleteId };
    //   addSpaceMeetingAction(data, token, 'DELETE');
    //   setModalDeleteId('');
    // }

    // if (!loading) {
    //   // console.log('++++++++++++++++++++++');
    //   if (addLocationFloor && modalDeleteIds) {
    //     handleGetSpaceLocation();
    //     setModalDeleteIds(false);
    //   } else if (addlocation && modalDeleteId) {
    //     handleGetSpaceLocation();
    //     setModalDeleteId(false);
    //   }
    // }
  }, [
    modalOpen,
    meeting,
    location,
    // token,
    // modalDeleteId,
    // addSpaceMeetingAction,
  ]);

  const handleModalDelete = (id) => {
    addSpaceMeetingAction({ id }, token, 'DELETE');
    setModalDeleteId('');
    setModalDelete_H(true);

    setTimeout(() => {
      setModalDelete_H(false);
      handleGetSpaceMeeting();
    }, 100);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return (
    <div className="disable-text-selection">
      <ListMeetingRoomHeading
        heading={initialLoad.heading}
        modelTitle={initialLoad.modelTitle}
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
      />
      {locationData && (
        <AddMeetingRoomModal
          modelTitle={initialLoad.modelTitle}
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          item={dataEdit}
          locationData={locationData}
          type={initialLoad.type}
          token={token}
          handleGetSpaceMeeting={handleGetSpaceMeeting}
          setModalDelete_H={modalDelete_H}
        />
      )}

      <ListMeetingRoomListing
        items={items}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
        toggleModal={() => {
          return setModalOpen(!modalOpen), setDataEdit(dataEdit);
        }}
        locationData={locationData}
        setDataEdit={setDataEdit}
        setModalDeleteId={handleModalDelete}
      />
    </div>
  );
};

const mapStateToProps = ({ space }) => {
  const { location } = space;
  const { meeting, loading, error, addMeeting } = space;
  return { location, meeting, loading, error, addMeeting };
};

export default connect(mapStateToProps, {
  getSpaceMeetingListAction: getSpaceMeetingList,
  addSpaceMeetingAction: addSpaceMeeting,
  getSpaceLocationListAction: getSpaceLocationList,
})(SpaceMeetingRoom);
