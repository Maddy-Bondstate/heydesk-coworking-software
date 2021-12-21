import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import CustomerListView from './CustomerListView';

function collect(props) {
  return { data: props.data };
}

const ListCustomerListing = ({
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
          <CustomerListView
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

export default React.memo(ListCustomerListing);
