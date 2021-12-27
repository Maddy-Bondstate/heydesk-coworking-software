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

  const [dateFrom, setDateFrom] = useState(moment().add(1, 'day').toDate());
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
      let custDatas = [];
      spaceData.map((c) =>
        custDatas.push({
          label: `${c.name}`,
          value: c.id,
        })
      );

      setSpaceListData(custDatas);
    }

    if (!loading && addBooking) {
      window.location.reload();
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
        start_time: moment(dateFrom).format('DD/MM/YYYY HH:mm'),
        end_time: moment(dateTo).format('DD/MM/YYYY HH:mm'),
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
              <span>
                <IntlMessages id="label.space" />
              </span>
            </Label>

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
                    onChange={(val) => setDateFrom(val)}
                    dateFormat="MMM dd, yyyy HH:mm"
                    todayButton={messages['label.today']}
                    minDate={moment().add(1, 'day').toDate()}
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                </div>
              </Colxx>
              <Colxx sm="6">
                <div className="form-group has-float-label">
                  <DatePicker
                    id="end_time"
                    name="end_time"
                    selected={dateTo}
                    onChange={(val) => setDateTo(val)}
                    dateFormat="MMM dd, yyyy HH:mm"
                    todayButton={messages['label.today']}
                    minDate={dateFrom || moment().toDate()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    required
                  />
                </div>
              </Colxx>
            </Row>
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
