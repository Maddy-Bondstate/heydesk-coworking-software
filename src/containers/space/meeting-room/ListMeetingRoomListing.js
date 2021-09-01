import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import { Colxx } from '../../../components/common/CustomBootstrap';
import MeetingRoomListView from './MeetingRoomListView';

function collect(props) {
  return { data: props.data };
}

const ListMeetingRoomListing = ({
  items,
  currentPage,
  totalPage,
  toggleModal,
  toggleFloor,
  onChangePage,
}) => {
  return (
    <Row>
      <Colxx>
        <Colxx className="py-2 mb-2 font-weight-bold bg-secondary-color d-flex flex-grow-1">
          <Colxx sm="6">NAME</Colxx>
          <Colxx sm="6">CALENDAR</Colxx>
        </Colxx>
      </Colxx>

      {items.map((meeting_room) => {
        return (
          <MeetingRoomListView
            key={meeting_room.id}
            meeting_room={meeting_room}
            collect={collect}
            toggleModal={toggleModal}
            toggleFloor={toggleFloor}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(ListMeetingRoomListing);
