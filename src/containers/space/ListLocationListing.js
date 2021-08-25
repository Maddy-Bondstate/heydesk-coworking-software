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
}) => {
  return (
    <Row>
      {items.map((product) => {
        return (
          <LocationListView
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

export default React.memo(ListLocationListing);
