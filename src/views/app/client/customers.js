import React, { useState, useEffect, useLayoutEffect } from 'react';

import {
  getClientCustomerList,
  addClientCustomer,
} from '../../../redux/actions';
import { connect } from 'react-redux';

import ListCustomerListing from '../../../containers/client/customers/ListCustomerListing';
import AddCustomerModal from '../../../containers/client/customers/AddCustomerModal';
import ListCustomerHeading from '../../../containers/client/customers/ListCustomerHeading';

const pageSizes = [4, 8, 12, 20];

const ClientCustomers = ({
  history,
  match,
  loading,
  token,
  customer,
  getClientCustomerListAction,
  addClientCustomerAction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    getClientCustomerListAction(token);
  }, [getClientCustomerListAction]);

  const handleGetClientCustomers = () => {
    getClientCustomerListAction(token);
  };

  useLayoutEffect(() => {
    if (customer?.data) {
      setTotalItemCount(customer.data.count);
      setItems(customer.data.results);
    }

    if (match.params.id === 'add') {
      history.push('/app/client/customers');
      setModalOpen(true);
    }
  }, [customer, match]);

  const handleModalDelete = (id) => {
    addClientCustomerAction({ id }, token, 'DELETE');
    setTimeout(() => {
      handleGetClientCustomers();
    }, 100);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListCustomerHeading
        heading="menu.customers"
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

      <AddCustomerModal
        modelTitle="pages.add-customer"
        modalOpen={modalOpen}
        toggleModal={() => {
          return setModalId(null), setModalOpen(!modalOpen);
        }}
        item={modalId}
        token={token}
        handleGetClientCustomers={handleGetClientCustomers}
      />

      <ListCustomerListing
        items={items}
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={setCurrentPage}
        toggleModal={() => {
          return setModalOpen(!modalOpen), setModalId(modalId);
        }}
        setModalId={setModalId}
        setModalDeleteId={handleModalDelete}
      />
    </div>
  );
};

const mapStateToProps = ({ client }) => {
  const { loading, customer, addCustomer, error } = client;
  return { loading, customer, addCustomer, error };
};

export default connect(mapStateToProps, {
  getClientCustomerListAction: getClientCustomerList,
  addClientCustomerAction: addClientCustomer,
})(ClientCustomers);
