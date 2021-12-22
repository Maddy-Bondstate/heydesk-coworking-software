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

const SpaceDesks = ({
  match,
  location,
  meeting,
  loading,
  error,
  addMeeting,
  getSpaceMeetingListAction,
  addSpaceMeetingAction,
  getSpaceLocationListAction,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    getSpaceMeetingListAction();
    getSpaceLocationListAction();
  }, [getSpaceMeetingListAction, getSpaceLocationListAction]);

  useLayoutEffect(() => {
    if (!modalOpen) setDataEdit(null);

    if (meeting?.data) {
      setIsLoaded(true);
      setItems(meeting.data.results);
    }

    if (location?.data) {
      setLocationData(location.data.results);
    }

    if (modalDeleteId !== '') {
      addSpaceMeetingAction({ id: modalDeleteId }, 'DELETE');
      setModalDeleteId('');
    }
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListMeetingRoomHeading
        heading="menu.meeting-rooms"
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
          modelTitle="space.add-meeting-room"
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          item={dataEdit}
          locationData={locationData}
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
        setModalDeleteId={setModalDeleteId}
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
})(SpaceDesks);
