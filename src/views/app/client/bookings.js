import React, { useState, useEffect, useLayoutEffect } from 'react';

import { getClientBookingList, addClientBooking } from '../../../redux/actions';
import { connect } from 'react-redux';

import ListBookingListing from '../../../containers/client/bookings/ListBookingListing';
import AddBookingModal from '../../../containers/client/bookings/AddBookingModal';
import ListBookingHeading from '../../../containers/client/bookings/ListBookingHeading';

const pageSizes = [4, 8, 12, 20];

const ClientBookings = ({
  match,
  loading,
  booking,
  addBooking,
  customer,
  addCustomer,
  error,
  getClientBookingListAction,
  addClientBookingAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  // const [itemsLoca, setItemsLoca] = useState(false);

  const [modalId, setModalId] = useState(null);
  const [modalDeleteId, setModalDeleteId] = useState('');

  useEffect(() => {
    getClientBookingListAction();
  }, [getClientBookingListAction]);

  useLayoutEffect(() => {
    if (booking?.data) {
      setTotalItemCount(booking.data.count);
      setItems(booking.data.results);
    }
    // if (!modalOpen) setModalId(null);
    // if (modalDeleteId !== '') {
    //   addSpaceLocationAction({ id: modalDeleteId }, 'DELETE');
    //   setModalDeleteId('');
    // }
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListBookingHeading
        heading="menu.bookings"
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

      <AddBookingModal
        modelTitle="pages.add-booking"
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        item={modalId}
      />

      <ListBookingListing
        items={items}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
        toggleModal={() => {
          return setModalOpen(!modalOpen), setModalId(modalId);
        }}
        setModalId={setModalId}
        setModalDeleteId={setModalDeleteId}
      />
    </div>
  );
};

const mapStateToProps = ({ client }) => {
  const { loading, booking, addBooking, customer, addCustomer, error } = client;
  return { loading, booking, addBooking, customer, addCustomer, error };
};

export default connect(mapStateToProps, {
  getClientBookingListAction: getClientBookingList,
  addClientBookingAction: addClientBooking,
})(ClientBookings);
