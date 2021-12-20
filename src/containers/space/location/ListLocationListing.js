import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import LocationListView from './LocationListView';

function collect(props) {
  return { data: props.data };
}

const ListLocationListing = ({
  items,
  currentPage,
  totalPage,
  toggleModal,
  toggleFloor,
  onChangePage,
  setModalId,
  setModalDeleteId,
}) => {
  return (
    <Row>
      {items.map((item) => {
        return (
          <LocationListView
            key={item.id}
            item={item}
            collect={collect}
            toggleModal={toggleModal}
            toggleFloor={toggleFloor}
            setModalId={setModalId}
            setModalDeleteId={setModalDeleteId}
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

export default React.memo(ListLocationListing);
