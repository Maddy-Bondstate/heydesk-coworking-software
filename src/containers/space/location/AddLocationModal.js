import React, { useState, useLayoutEffect, useEffect } from 'react';
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
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

import moment from 'moment';
import IntlMessages from '../../../helpers/IntlMessages';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import TimezoneSelect from 'react-timezone-select';

import { addSpaceLocation } from '../../../redux/actions';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

const AddLocationModal = (props) => {
  const {
    modelTitle,
    modalOpen,
    toggleModal,
    intl,
    // loading,
    addSpaceLocationAction,
    item,
    // addlocation,
    // handleGetSpaceLocation,
  } = props;

  const { messages } = intl;

  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [startBusinessHour, setStartBusinessHour] = useState(
    new Date(moment().format('YYYY-MM-DDT09:00'))
  );
  const [endBusinessHour, setEndBusinessHour] = useState(
    new Date(moment().format('YYYY-MM-DDT17:00'))
  );
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [files, setFiles] = useState(null);

  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(false);

  const [state, setState] = useState({
    name: '',
    unique_code: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  });

  useLayoutEffect(() => {
    // console.log(item);
    if (item !== null) {
      setState({
        ...state,
        name: item.name,
        unique_code: item.unique_code,
        description: item.description,
        address: item.address ? item.address : '',
        city: item.city,
        state: item.state,
        country: item.country,
        zipcode: item.zipcode,
      });

      setSelectedTimezone({ value: item.time_zone });
      item.start_time &&
        setStartBusinessHour(
          new Date(
            moment(item.start_time, 'HH:mm:ss').format('YYYY-MM-DDTHH:mm')
          )
        );
      item.end_time &&
        setEndBusinessHour(
          new Date(moment(item.end_time, 'HH:mm:ss').format('YYYY-MM-DDTHH:mm'))
        );
      setCheckedPrimarySmall(item.is_open);
    }
  }, [item]);

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    setFiles(null);
    setTimeout(() => (document.getElementById('fileupload').value = ''), 50);
  };

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
      image: files,
      start_time: moment(startBusinessHour).format('HH:mm'),
      end_time: moment(endBusinessHour).format('HH:mm'),
      time_zone: selectedTimezone.value,
      is_open: checkedPrimarySmall,
    };

    if (item) addSpaceLocationAction({ ...data, id: item.id }, 'PUT');
    else addSpaceLocationAction(data, 'POST');
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
                  <Colxx sm="8">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChangeValue}
                        placeholder={messages['label.name']}
                      />
                      <span>
                        <IntlMessages id="label.name" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="4">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        name="unique_code"
                        value={state.unique_code}
                        onChange={handleChangeValue}
                        placeholder={messages['label.unique_code']}
                      />
                      <span>
                        <IntlMessages id="label.unique_code" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>

                <Label className="form-group has-float-label">
                  <Input
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={handleChangeValue}
                    placeholder={messages['label.description']}
                  />
                  <span>
                    <IntlMessages id="label.description" />
                  </span>
                </Label>

                <Row>
                  <Colxx>
                    <Label>
                      <IntlMessages id="label.business_hours" />
                    </Label>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx sm="6">
                    <div className="form-group has-float-label">
                      <DatePicker
                        name="from_time"
                        selected={startBusinessHour}
                        onChange={(val) => setStartBusinessHour(val)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        timeCaption="Time"
                      />
                    </div>
                  </Colxx>
                  <Colxx sm="6">
                    <div className="form-group has-float-label">
                      <DatePicker
                        name="to_time"
                        selected={endBusinessHour}
                        onChange={(val) => setEndBusinessHour(val)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="HH:mm"
                        timeCaption="Time"
                      />
                    </div>
                  </Colxx>
                </Row>

                <div className="form-group has-float-label">
                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                  />
                  <span>
                    <IntlMessages id="label.timezone" />
                  </span>
                </div>

                <Row>
                  <Colxx className="form-group">
                    <Label className="mr-4">
                      <IntlMessages id="label.image" />
                    </Label>

                    {!files ? (
                      <Label className="custom-image-attach-inline">
                        <Input
                          type="file"
                          id="fileupload"
                          onChange={onChangeImage}
                        />
                        <i className="fa fa-cloud-upload mr-2" /> Upload
                      </Label>
                    ) : (
                      <Label>
                        <img
                          src={URL.createObjectURL(files)}
                          alt=""
                          width="150"
                        />
                        <span
                          onClick={removeFile}
                          className="ml-3 cursor-pointer"
                        >
                          <i className="fa fa-times-circle fa-2x text-secondary" />
                        </span>
                      </Label>
                    )}
                  </Colxx>
                </Row>

                <Row>
                  <Colxx className="form-group">
                    <Switch
                      className="custom-switch custom-switch-primary custom-switch-small mr-3"
                      checked={checkedPrimarySmall}
                      onChange={(primary) => setCheckedPrimarySmall(primary)}
                    />
                    <IntlMessages id="label.isopen" />
                  </Colxx>
                </Row>
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
        {/* {loading ? (
          <div className="loading" />
        ) : ( */}
        <Button color="primary" size="sm" onClick={handleSubmitLocation}>
          <IntlMessages id="model.add" />
        </Button>
        {/* )} */}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ space }) => {
  const { addlocation } = space;
  return { addlocation };
};

export default injectIntl(
  connect(mapStateToProps, {
    addSpaceLocationAction: addSpaceLocation,
  })(AddLocationModal)
);
