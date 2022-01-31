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
  token,
  modelTitle,
  modalOpen,
  toggleModal,
  intl,
  locationData,
  addMeeting,
  loading,
  item,
  type,
  addSpaceMeetingAction,
  handleGetSpaceMeeting,
  setModalDelete_H,
}) => {
  const { messages } = intl;

  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [availableTo, setAvailableTo] = useState(new Date());
  const [files, setFiles] = useState(null);
  const [selectedOptionLocation, setSelectedOptionLocation] = useState('');
  const [selectedOptionFloor, setSelectedOptionFloor] = useState('');
  const [locationListData, setLocationListData] = useState([]);
  const [floorListData, setFloorListData] = useState([]);
  const [fetchSpace, setFetchSpace] = useState(false);
  const [getImage, setGetImage] = useState('');

  const [state, setState] = useState({
    type: type,
    name: '',
    area: '',
    size: '',
    rate: '',
    description: '',
    color: '#000000',
    privacy: '1',
  });

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    if (getImage === '') setFiles(null);
    else setGetImage('');

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
    if (
      state.name !== '' &&
      selectedOptionLocation &&
      selectedOptionLocation !== '' &&
      selectedOptionFloor &&
      selectedOptionFloor !== '' &&
      state.size !== '' &&
      state.size >= 1 &&
      state.area !== '' &&
      state.area >= 100 &&
      state.rate !== '' &&
      state.rate >= 1 &&
      state.description !== ''
    ) {
      let data = {
        ...state,
        location: selectedOptionLocation.value,
        floor: selectedOptionFloor.value,
        start_data: moment(availableFrom).format('DD/MM/YYYY'),
        end_data: moment(availableTo).format('DD/MM/YYYY'),
      };

      if (getImage === '' && files) {
        data = {
          ...data,
          image: files,
        };
      }

      // console.log(item, data);

      if (item) addSpaceMeetingAction({ ...data, id: item.id }, token, 'PUT');
      else addSpaceMeetingAction(data, token, 'POST');
      setFetchSpace(false);
    } else {
      // console.log(document.getElementsByName('name')[0]);
      document.getElementsByName('name')[0].style.border = '1px solid #d7d7d7';
      document.getElementById('location').style.border = '1px solid #d7d7d7';

      // console.log(selectedOptionLocation);
      if (selectedOptionLocation && selectedOptionLocation !== '')
        document.getElementById('floor').style.border = '1px solid #d7d7d7';
      document.getElementsByName('size')[0].style.border = '1px solid #d7d7d7';
      document.getElementsByName('area')[0].style.border = '1px solid #d7d7d7';
      document.getElementsByName('rate')[0].style.border = '1px solid #d7d7d7';
      document.getElementsByName('description')[0].style.border =
        '1px solid #d7d7d7';

      if (state.name === '') {
        document.getElementsByName('name')[0].focus();
        document.getElementsByName('name')[0].style.border = '1px solid orange';
        return;
      }
      if (selectedOptionLocation === '') {
        document.getElementById('location').focus();
        document.getElementById('location').style.border = '1px solid orange';
        return;
      }
      if (
        selectedOptionFloor === '' &&
        selectedOptionLocation &&
        selectedOptionLocation !== ''
      ) {
        document.getElementById('floor').focus();
        document.getElementById('floor').style.border = '1px solid orange';
        return;
      }
      if (state.size === '' || state.size < 1) {
        document.getElementsByName('size')[0].focus();
        document.getElementsByName('size')[0].style.border = '1px solid orange';
        return;
      }
      if (state.area === '' || state.area < 100) {
        document.getElementsByName('area')[0].focus();
        document.getElementsByName('area')[0].style.border = '1px solid orange';
        return;
      }
      if (state.rate === '' || state.rate < 1) {
        document.getElementsByName('rate')[0].focus();
        document.getElementsByName('rate')[0].style.border = '1px solid orange';
        setActiveFirstTab('2');
        return;
      }
      if (state.description === '') {
        document.getElementsByName('description')[0].focus();
        document.getElementsByName('description')[0].style.border =
          '1px solid orange';
        setActiveFirstTab('2');
        return;
      }
    }
  };

  useLayoutEffect(() => {
    if (item && item !== null) {
      setState({
        type: item.type,
        name: item.name,
        area: item.area,
        size: item.size,
        rate: item.rate,
        description: item.description,
        color: item.color,
        privacy: item.privacy.toString(),
      });

      item.image && setGetImage(item.image);

      item.start_time &&
        setAvailableFrom(new Date(moment(item.start_time, 'DD/MM/YYYY')));
      item.end_time &&
        setAvailableTo(new Date(moment(item.end_time, 'DD/MM/YYYY')));

      setSelectedOptionLocation(item.location);
      setSelectedOptionFloor(item.floor);

      handleFloorData(item.location);
    } else {
      setState({
        type: type,
        name: '',
        area: '',
        size: '',
        rate: '',
        description: '',
        color: '#000000',
        privacy: '1',
      });

      setActiveFirstTab('1');
      setGetImage('');

      setAvailableFrom(new Date());
      setAvailableTo(new Date());

      setSelectedOptionLocation('');
      setSelectedOptionFloor('');
    }

    if (locationData) {
      let selectData = [];
      locationData.map((l) => selectData.push({ label: l.name, value: l.id }));

      setLocationListData(selectData);
    }

    if (!loading && addMeeting && !fetchSpace && !setModalDelete_H) {
      // console.log(':::::::::::::::::::::');
      setFetchSpace(true);
      handleGetSpaceMeeting();
      toggleModal(!modalOpen);
    }
  }, [
    item,
    addMeeting,
    toggleModal,
    handleGetSpaceMeeting,
    loading,
    modalOpen,
    locationData,
    setModalDelete_H,
  ]);

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
                    id="location"
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
                      id="floor"
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
                          type="number"
                          name="size"
                          value={state.size}
                          onChange={handleChangeValue}
                          placeholder={messages['label.size']}
                          min={1}
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
                          type="number"
                          name="area"
                          value={state.area}
                          onChange={handleChangeValue}
                          placeholder={messages['label.area']}
                          min={100}
                        />
                        <InputGroupAddon addonType="append">
                          <span className="input-group-text">
                            ft<sup>2</sup>
                          </span>
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
                      type="number"
                      name="rate"
                      value={state.rate}
                      onChange={handleChangeValue}
                      placeholder={messages['label.rate']}
                      min={1}
                    />
                    <InputGroupAddon addonType="append">$</InputGroupAddon>
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

                    {!files && getImage === '' ? (
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
                          src={
                            getImage !== ''
                              ? getImage
                              : URL.createObjectURL(files)
                          }
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

                {/* <FormGroup row>
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
                </FormGroup> */}
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" size="sm" outline onClick={toggleModal}>
          <IntlMessages id="model.close" />
        </Button>

        <Button color="primary" size="sm" onClick={handleSubmitMeetingRoom}>
          <IntlMessages id="forms.save" />
        </Button>
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
