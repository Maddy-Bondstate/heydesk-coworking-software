import React, { useState, useLayoutEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';

import moment from 'moment';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';

import { addClientBooking } from '../../../redux/actions';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

const AddBookingModal = (props) => {
  const {
    modelTitle,
    modalOpen,
    toggleModal,
    intl,
    loading,
    token,
    customerData,
    addBooking,
    spaceData,
    addClientBookingAction,
  } = props;

  const { messages } = intl;

  const [selectedOptionCustomer, setSelectedOptionCustomer] = useState('');
  const [customerListData, setCustomerListData] = useState([]);
  const [selectedOptionSpace, setSelectedOptionSpace] = useState('');
  const [spaceListData, setSpaceListData] = useState([]);

  const [dateFrom, setDateFrom] = useState(
    moment()
      .add(2, 'day')
      .set({
        h: '09',
        m: '00',
        s: '00',
      })
      .toDate()
  );
  const [dateTo, setDateTo] = useState('');

  useLayoutEffect(() => {
    if (customerData !== null) {
      let custData = [];

      customerData.map((c) =>
        custData.push({
          label: `${c.first_name} ${c.last_name}`,
          value: c.id,
        })
      );
      setCustomerListData(custData);
    }

    if (spaceData !== null) {
      let custDatas_1 = [];
      let custDatas_4 = [];
      let custDatas_5 = [];
      let custDatas_6 = [];

      spaceData
        .sort((a, b) => a.type - b.type)
        .map((c) => {
          if (c.type === 1) {
            return custDatas_1.push({
              label: `${c.name}`,
              value: c.id,
              type: c.type,
            });
          }
          if (c.type === 4) {
            return custDatas_4.push({
              label: `${c.name}`,
              value: c.id,
              type: c.type,
            });
          }
          if (c.type === 5) {
            return custDatas_5.push({
              label: `${c.name}`,
              value: c.id,
              type: c.type,
            });
          }
          if (c.type === 6) {
            return custDatas_6.push({
              label: `${c.name}`,
              value: c.id,
              type: c.type,
            });
          }
        });

      // const spaceTypeList = {
      //   1: 'Desks',
      //   4: 'Private Cabins',
      //   5: 'Meeting Rooms',
      //   6: 'Conference Rooms',
      // };

      let custDatas = [
        custDatas_1.length > 0 && {
          label: 'Desks',
          options: custDatas_1,
        },
        custDatas_4.length > 0 && {
          label: 'Private Cabins',
          options: custDatas_4,
        },
        custDatas_5.length > 0 && {
          label: 'Meeting Rooms',
          options: custDatas_5,
        },
        custDatas_6.length > 0 && {
          label: 'Conference Rooms',
          options: custDatas_6,
        },
      ];

      setSpaceListData(custDatas);
    }

    if (!loading && addBooking) {
      // window.location.reload();
    }
  }, [customerData, spaceData, addBooking]);

  const handleSubmitLocation = () => {
    if (
      selectedOptionCustomer &&
      selectedOptionCustomer !== '' &&
      selectedOptionSpace &&
      selectedOptionSpace !== '' &&
      dateTo !== ''
    ) {
      const data = {
        customer: selectedOptionCustomer.value,
        space: selectedOptionSpace.value,
        start_time: moment(dateFrom).format(
          selectedOptionSpace.type === 5
            ? 'DD/MM/YYYY HH:mm'
            : 'DD/MM/YYYY 00:00'
        ),
        end_time: moment(dateTo).format(
          selectedOptionSpace.type === 5
            ? 'DD/MM/YYYY HH:mm'
            : 'DD/MM/YYYY 00:00'
        ),
      };

      addClientBookingAction(data, token, 'POST');
    } else {
      document.getElementById('customer').style.border = '1px solid #d7d7d7';
      document.getElementById('space').style.border = '1px solid #d7d7d7';
      document.getElementById('end_time').style.border = '1px solid #d7d7d7';

      if (selectedOptionCustomer === '') {
        document.getElementById('customer').focus();
        document.getElementById('customer').style.border = '1px solid orange';
        return;
      }
      if (selectedOptionSpace === '') {
        document.getElementById('space').focus();
        document.getElementById('space').style.border = '1px solid orange';
        return;
      }
      if (dateTo === '') {
        document.getElementById('end_time').focus();
        document.getElementById('end_time').style.border = '1px solid orange';
        return;
      }
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modelTitle} />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Colxx>
            <Label className="form-group has-float-label">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                id="customer"
                name="customer"
                value={selectedOptionCustomer}
                onChange={setSelectedOptionCustomer}
                options={customerListData}
              />
              <a
                href="/app/client/customers/add"
                className="badge badge-success mt-1"
              >
                Add New Customer
              </a>
              <span>
                <IntlMessages id="label.customer" />
              </span>
            </Label>

            <Label className="form-group has-float-label">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                id="space"
                name="space"
                value={selectedOptionSpace}
                onChange={setSelectedOptionSpace}
                options={spaceListData}
              />
              <a
                href="/app/space/desks/add"
                className="badge badge-success mt-1 mr-2"
              >
                Add New Desk
              </a>
              <a
                href="/app/space/meeting-room/add"
                className="badge badge-success mt-1 mr-2"
              >
                Add New Meeting Room
              </a>
              <a
                href="/app/space/private-cabins/add"
                className="badge badge-success mt-1 mr-2"
              >
                Add New Private Cabin
              </a>
              <a
                href="/app/space/conference-room/add"
                className="badge badge-success mt-1 mr-2"
              >
                Add New Conference Room
              </a>
              <span>
                <IntlMessages id="label.space" />
              </span>
            </Label>

            {selectedOptionCustomer &&
              selectedOptionCustomer !== '' &&
              selectedOptionSpace &&
              selectedOptionSpace !== '' && (
                <>
                  <Row>
                    <Colxx>
                      <Label>
                        <IntlMessages id="label.booking_date" />
                      </Label>
                    </Colxx>
                  </Row>

                  <Row>
                    <Colxx sm="6">
                      <div className="form-group has-float-label">
                        <DatePicker
                          id="start_time"
                          name="start_time"
                          selected={dateFrom}
                          onChange={(val) => {
                            return setDateFrom(val), setDateTo('');
                          }}
                          dateFormat={
                            selectedOptionSpace.type === 5
                              ? `MMM dd, yyyy HH:mm`
                              : `MMM dd, yyyy`
                          }
                          todayButton={messages['label.today']}
                          minDate={moment().add(2, 'day').toDate()}
                          showTimeSelect={
                            selectedOptionSpace.type === 5 ? true : false
                          }
                          timeFormat="HH:mm"
                        />
                      </div>
                    </Colxx>
                    <Colxx sm="6">
                      <div className="form-group has-float-label">
                        <DatePicker
                          id="end_time"
                          name="end_time"
                          selected={
                            dateTo === ''
                              ? selectedOptionSpace.type === 5
                                ? moment(dateFrom).add(2, 'hours').toDate()
                                : dateFrom
                              : dateTo
                          }
                          onChange={(val) => setDateTo(val)}
                          dateFormat={
                            selectedOptionSpace.type === 5
                              ? `MMM dd, yyyy HH:mm`
                              : `MMM dd, yyyy`
                          }
                          todayButton={messages['label.today']}
                          minDate={moment(dateFrom)
                            .add(2, 'day')
                            .add(2, 'hours')
                            .toDate()}
                          showTimeSelect={
                            selectedOptionSpace.type === 5 ? true : false
                          }
                          timeFormat="HH:mm"
                          required
                        />
                      </div>
                    </Colxx>
                  </Row>
                </>
              )}
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
  const { loading, booking, addBooking, error } = client;
  return { loading, booking, addBooking, error };
};

export default injectIntl(
  connect(mapStateToProps, {
    addClientBookingAction: addClientBooking,
  })(AddBookingModal)
);
