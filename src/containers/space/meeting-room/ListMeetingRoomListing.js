import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
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
      {items.map((product) => {
        return (
          <MeetingRoomListView
            key={product.id}
            product={product}
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
