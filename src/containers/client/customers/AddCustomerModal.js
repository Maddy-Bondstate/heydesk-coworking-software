import React, { useState, useLayoutEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from '../../../components/common/CustomBootstrap';

import { addClientCustomer } from '../../../redux/actions';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

const AddCustomerModal = (props) => {
  const {
    modelTitle,
    modalOpen,
    toggleModal,
    intl,
    loading,
    addClientCustomerAction,
    item,
    token,
    addCustomer,
    handleGetClientCustomers,
  } = props;

  const { messages } = intl;

  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [fetchSpace, setFetchSpace] = useState(false);

  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });

  useLayoutEffect(() => {
    if (item !== null) {
      setState({
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        phone: item.phone,
        address: item.address,
        city: item.city,
        state: item.state,
        country: item.country,
        zipcode: item.zipcode,
      });
    }
    //  else {
    //   setState({
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     phone: '',
    //     address: '',
    //     city: '',
    //     state: '',
    //     zipcode: '',
    //     country: '',
    //   });
    //   setActiveFirstTab('1');
    // }

    if (!loading && addCustomer && !fetchSpace) {
      window.location.reload();
      // console.log(loading, addCustomer, fetchSpace);
      // console.log(':::::::::::::::::::::');
      // setFetchSpace(true);
      // handleGetClientCustomers();
      // toggleModal(!modalOpen);
    }
  }, [item]);

  const handleChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmitLocation = () => {
    const data = {
      ...state,
    };

    if (item) addClientCustomerAction({ ...data, id: item.id }, token, 'PUT');
    else addClientCustomerAction(data, token, 'POST');

    setFetchSpace(false);
    // toggleModal(!modalOpen);
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modelTitle} />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Colxx>
            <Nav tabs>
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab === '1',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveFirstTab('1');
                  }}
                >
                  General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab === '2',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveFirstTab('2');
                  }}
                >
                  Address
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeFirstTab}>
              <TabPane tabId="1">
                <Row>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="first_name"
                        value={state.first_name}
                        onChange={handleChangeValue}
                        placeholder={messages['label.first_name']}
                      />
                      <span>
                        <IntlMessages id="label.first_name" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="last_name"
                        value={state.last_name}
                        onChange={handleChangeValue}
                        placeholder={messages['label.last_name']}
                      />
                      <span>
                        <IntlMessages id="label.last_name" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>

                <Label className="form-group has-float-label">
                  <Input
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={handleChangeValue}
                    placeholder={messages['label.email']}
                  />
                  <span>
                    <IntlMessages id="label.email" />
                  </span>
                </Label>

                <Label className="form-group has-float-label">
                  <Input
                    type="text"
                    name="phone"
                    value={state.phone}
                    onChange={handleChangeValue}
                    placeholder={messages['label.phone']}
                  />
                  <span>
                    <IntlMessages id="label.phone" />
                  </span>
                </Label>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Colxx>
                    <Label className="form-group has-float-label">
                      <Input
                        type="textarea"
                        name="address"
                        value={state.address}
                        onChange={handleChangeValue}
                        placeholder={messages['label.address']}
                      />
                      <span>
                        <IntlMessages id="label.address" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="city"
                        value={state.city}
                        onChange={handleChangeValue}
                        placeholder={messages['label.city']}
                      />
                      <span>
                        <IntlMessages id="label.city" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="state"
                        value={state.state}
                        onChange={handleChangeValue}
                        placeholder={messages['label.state']}
                      />
                      <span>
                        <IntlMessages id="label.state" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="zipcode"
                        value={state.zipcode}
                        onChange={handleChangeValue}
                        placeholder={messages['label.zip']}
                      />
                      <span>
                        <IntlMessages id="label.zip" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="country"
                        value={state.country}
                        onChange={handleChangeValue}
                        placeholder={messages['label.country']}
                      />
                      <span>
                        <IntlMessages id="label.country" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" size="sm" outline onClick={toggleModal}>
          <IntlMessages id="model.close" />
        </Button>
        {loading ? (
          <div className="loading" />
        ) : (
          <Button color="primary" size="sm" onClick={handleSubmitLocation}>
            <IntlMessages id="model.add" />
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ client }) => {
  const { loading, booking, addBooking, customer, addCustomer, error } = client;
  return { loading, booking, addBooking, customer, addCustomer, error };
};

export default injectIntl(
  connect(mapStateToProps, {
    addClientCustomerAction: addClientCustomer,
  })(AddCustomerModal)
);
