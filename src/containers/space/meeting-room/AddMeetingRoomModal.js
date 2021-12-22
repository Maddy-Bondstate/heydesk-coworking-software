import React, { useState, useLayoutEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';

import moment from 'moment';
import IntlMessages from '../../../helpers/IntlMessages';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { addSpaceMeeting } from '../../../redux/actions';
import { connect } from 'react-redux';

const AddMeetingRoomModal = ({
  modelTitle,
  modalOpen,
  toggleModal,
  intl,
  locationData,
  loading,
  item,
  addSpaceMeetingAction,
}) => {
  const { messages } = intl;

  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [availableTo, setAvailableTo] = useState();
  const [files, setFiles] = useState('');
  const [selectedOptionLocation, setSelectedOptionLocation] = useState('');
  const [selectedOptionFloor, setSelectedOptionFloor] = useState('');
  const [locationListData, setLocationListData] = useState([]);
  const [floorListData, setFloorListData] = useState([]);

  const [state, setState] = useState({
    type: 5,
    name: '',
    area: '',
    size: '',
    rate: '',
    description: '',
    image: null,
    color: '',
    privacy: '',
  });

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    setFiles('');
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

  const handleSubmitMeetingRoom = () => {
    const data = {
      ...state,
      location: selectedOptionLocation.value,
      floor: selectedOptionFloor.value,
      start_data: moment(availableFrom).format('DD/MM/YYYY'),
      end_data: moment(availableTo).format('DD/MM/YYYY'),
    };

    if (item) {
      addSpaceMeetingAction({ ...data, id: item.id }, 'PUT');
    } else {
      addSpaceMeetingAction(data, 'POST');
    }
  };

  useLayoutEffect(() => {
    if (item !== null) {
      setState({
        ...state,
        type: item.type,
        name: item.name,
        area: item.area,
        size: item.size,
        rate: item.rate,
        description: item.description,
        image: null,
        color: item.color,
        privacy: item.privacy.toString(),
      });

      item.start_time &&
        setAvailableFrom(new Date(moment(item.start_time, 'DD/MM/YYYY')));
      item.end_time &&
        setAvailableTo(new Date(moment(item.end_time, 'DD/MM/YYYY')));

      setSelectedOptionLocation(item.location);
      setSelectedOptionFloor(item.floor);

      handleFloorData(item.location);
    }

    if (locationData) {
      let selectData = [];
      locationData.map((l) => selectData.push({ label: l.name, value: l.id }));

      setLocationListData(selectData);
    }
  }, [item, state, locationData]);

  const handleFloorData = ({ value }) => {
    const objIndex = locationData.findIndex((obj) => obj.id === value);

    let selectData = [];
    locationData[objIndex].floors.map((l) =>
      selectData.push({ label: l.name, value: l.id })
    );

    setFloorListData(selectData);
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
                  Calendar
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeFirstTab}>
              <TabPane tabId="1">
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

                <Label className="form-group has-float-label">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="location"
                    value={selectedOptionLocation}
                    onChange={(e) => {
                      return setSelectedOptionLocation(e), handleFloorData(e);
                    }}
                    options={locationListData}
                  />
                  <span>
                    <IntlMessages id="label.location" />
                  </span>
                </Label>

                {selectedOptionLocation !== '' && (
                  <Label className="form-group has-float-label">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="floor"
                      value={selectedOptionFloor}
                      onChange={setSelectedOptionFloor}
                      options={floorListData}
                    />
                    <span>
                      <IntlMessages id="label.floor" />
                    </span>
                  </Label>
                )}

                <Row>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <InputGroup className="mb-3">
                        <Input
                          name="size"
                          value={state.size}
                          onChange={handleChangeValue}
                          placeholder={messages['label.size']}
                        />
                        <InputGroupAddon addonType="append">
                          people
                        </InputGroupAddon>
                      </InputGroup>
                      <span>
                        <IntlMessages id="label.size" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <InputGroup className="mb-3">
                        <Input
                          name="area"
                          value={state.area}
                          onChange={handleChangeValue}
                          placeholder={messages['label.area']}
                        />
                        <InputGroupAddon addonType="append">
                          ft2
                        </InputGroupAddon>
                      </InputGroup>
                      <span>
                        <IntlMessages id="label.area" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>

                <Label>
                  <IntlMessages id="label.available_from" />
                </Label>

                <Row>
                  <Colxx sm="6">
                    <div className="form-group has-float-label">
                      <DatePicker
                        name="start_date"
                        selected={availableFrom}
                        onChange={(val) => setAvailableFrom(val)}
                        dateFormat="MMM dd, yyyy"
                        todayButton={messages['label.today']}
                        minDate={moment().toDate()}
                      />
                    </div>
                  </Colxx>
                  <Colxx sm="6">
                    <div className="form-group has-float-label">
                      <DatePicker
                        name="end_date"
                        selected={availableTo}
                        onChange={(val) => setAvailableTo(val)}
                        dateFormat="MMM dd, yyyy"
                        todayButton={messages['label.today']}
                        minDate={availableFrom || moment().toDate()}
                        required
                      />
                    </div>
                  </Colxx>
                </Row>
                <Label className="text-muted text-small">
                  The resource will be marked as 'Unavailable' and won't affect
                  occupancy before and after the availability period.
                </Label>
              </TabPane>

              <TabPane tabId="2">
                <Label className="form-group has-float-label">
                  <InputGroup className="mb-3">
                    <Input
                      name="rate"
                      value={state.rate}
                      onChange={handleChangeValue}
                      placeholder={messages['label.rate']}
                    />
                    <InputGroupAddon addonType="append">ft2</InputGroupAddon>
                  </InputGroup>
                  <span>
                    <IntlMessages id="label.rate" />
                  </span>
                </Label>

                <Label className="form-group has-float-label">
                  <Input
                    type="textarea"
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
                  <Colxx sm="8">
                    <Label className="px-0 mr-2" sm="3">
                      <IntlMessages id="label.image" />
                    </Label>

                    {files === '' ? (
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
                  <Colxx sm="4">
                    <Label className="form-group has-float-label">
                      <Input
                        type="color"
                        name="color"
                        value={state.color}
                        onChange={handleChangeValue}
                        placeholder={messages['label.color']}
                      />
                      <span>
                        <IntlMessages id="label.color" />
                      </span>
                    </Label>
                  </Colxx>
                </Row>

                <FormGroup row>
                  <Colxx sm="2">
                    <Label className="pt-0">
                      <IntlMessages id="label.privacy" />
                    </Label>
                  </Colxx>
                  <Colxx sm="8">
                    <FormGroup check className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="privacy"
                          value="1"
                          onChange={handleChangeValue}
                          checked={state.privacy === '1' ? true : false}
                        />
                        Full Access / Public
                      </Label>
                      <div className="text-muted text-small">
                        Available to members, non-members and on the public
                        calendar.
                      </div>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="privacy"
                          value="2"
                          onChange={handleChangeValue}
                          checked={state.privacy === '2' ? true : false}
                        />
                        Active Members
                      </Label>
                      <div className="text-muted text-small">
                        Available to active members.
                      </div>
                    </FormGroup>
                  </Colxx>
                </FormGroup>
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
          <Button color="primary" size="sm" onClick={handleSubmitMeetingRoom}>
            <IntlMessages id="model.add" />
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ space }) => {
  const { addMeeting, loading } = space;
  return { addMeeting, loading };
};

export default injectIntl(
  connect(mapStateToProps, {
    addSpaceMeetingAction: addSpaceMeeting,
  })(AddMeetingRoomModal)
);
