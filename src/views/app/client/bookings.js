import React, { useState, useEffect, useLayoutEffect } from 'react';

import {
  getClientBookingList,
  getClientCustomerList,
  addClientBooking,
  getSpaceMeetingList,
} from '../../../redux/actions';
import { connect } from 'react-redux';

import ListBookingListing from '../../../containers/client/bookings/ListBookingListing';
import AddBookingModal from '../../../containers/client/bookings/AddBookingModal';
import ListBookingHeading from '../../../containers/client/bookings/ListBookingHeading';

const pageSizes = [4, 8, 12, 20];

const ClientBookings = ({
  history,
  match,
  loading,
  booking,
  customer,
  token,
  meeting,
  getClientBookingListAction,
  getSpaceMeetingListAction,
  getClientCustomerListAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [spaceData, setSpaceData] = useState([]);

  // const [modalId, setModalId] = useState(null);
  // const [modalDeleteId, setModalDeleteId] = useState('');

  useEffect(() => {
    getClientBookingListAction(token);
    getClientCustomerListAction(token);
    getSpaceMeetingListAction({}, token);
  }, [
    getClientBookingListAction,
    getClientCustomerListAction,
    getSpaceMeetingListAction,
  ]);

  useLayoutEffect(() => {
    if (booking?.data) {
      setTotalItemCount(booking.data.count);
      setItems(booking.data.results);
    }

    if (customer?.data) {
      setCustomerData(customer.data.results);
    }

    if (meeting?.data) {
      setSpaceData(meeting.data.results);
    }

    if (match.params.id === 'add') {
      history.push('/app/client/bookings');
      setModalOpen(true);
    }
  }, [booking, customer, meeting, match]);

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
        // item={modalId}
        customerData={customerData}
        spaceData={spaceData}
        token={token}
      />

      <ListBookingListing
        items={items}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
        customerData={customerData}
        spaceData={spaceData}
        // toggleModal={() => {
        //   return setModalOpen(!modalOpen);
        //   // , setModalId(modalId);
        // }}
        // setModalId={setModalId}
        // setModalDeleteId={setModalDeleteId}
      />
    </div>
  );
};

const mapStateToProps = ({ client, space }) => {
  const { loading, booking, addBooking, customer, addCustomer, error } = client;
  const { meeting } = space;
  return {
    loading,
    booking,
    addBooking,
    customer,
    addCustomer,
    error,
    meeting,
  };
};

export default connect(mapStateToProps, {
  getClientBookingListAction: getClientBookingList,
  getClientCustomerListAction: getClientCustomerList,
  getSpaceMeetingListAction: getSpaceMeetingList,
  addClientBookingAction: addClientBooking,
})(ClientBookings);
