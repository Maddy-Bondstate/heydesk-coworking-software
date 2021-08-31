import React, { useState } from 'react';
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

const selectData = [
  { label: 'Bondstate', value: 'bondstate' },
  { label: 'Heydesk', value: 'heydesk' },
];

const floorData = [
  { label: 'Floor1', value: 'floor1' },
  { label: 'Floor2', value: 'floor2' },
];

const rateData = [
  { label: 'Large Meeting Room $30', value: 'Large Meeting Room $30' },
  { label: 'Small Meeting Room $20', value: 'Small Meeting Room $20' },
];

const AddMeetingRoomModal = ({ modelTitle, modalOpen, toggleModal, intl }) => {
  const { messages } = intl;

  const [selectedOption, setSelectedOption] = useState('');
  const [floorOption, setFloorOption] = useState('');
  const [rateOption, setRateOption] = useState('');
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [availableTo, setAvailableTo] = useState();
  const [files, setFiles] = useState('');

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    setFiles('');
    setTimeout(() => (document.getElementById('fileupload').value = ''), 50);
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
                  <Input type="text" placeholder={messages['label.name']} />
                  <span>
                    <IntlMessages id="label.name" />
                  </span>
                </Label>

                <Label className="form-group has-float-label">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={selectData}
                  />
                  <span>
                    <IntlMessages id="label.location" />
                  </span>
                </Label>

                <Label className="form-group has-float-label">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={floorOption}
                    onChange={setFloorOption}
                    options={floorData}
                  />
                  <span>
                    <IntlMessages id="label.floor" />
                  </span>
                </Label>

                <Row>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <InputGroup className="mb-3">
                        <Input placeholder={messages['label.size']} />
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
                        <Input placeholder={messages['label.area']} />
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
                        selected={availableTo}
                        onChange={(val) => setAvailableTo(val)}
                        dateFormat="MMM dd, yyyy"
                        todayButton={messages['label.today']}
                        minDate={availableFrom || moment().toDate()}
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
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={rateOption}
                    onChange={setRateOption}
                    options={rateData}
                  />
                  <span>
                    <IntlMessages id="label.rate" />
                  </span>
                </Label>

                <Label className="form-group has-float-label">
                  <Input
                    type="textarea"
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
                        <Input type="radio" name="radio1" />
                        Full Access / Public
                      </Label>
                      <div className="text-muted text-small">
                        Available to members, non-members and on the public
                        calendar.
                      </div>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio1" />
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
        <Button color="primary" size="sm" onClick={toggleModal}>
          <IntlMessages id="model.add" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default injectIntl(AddMeetingRoomModal);
