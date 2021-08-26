import React, { useState } from 'react';
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
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

import moment from 'moment';
import IntlMessages from '../../../helpers/IntlMessages';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import TimezoneSelect from 'react-timezone-select';

import 'react-datepicker/dist/react-datepicker.css';

const selectData = [
  { label: 'Bondstate', value: 'bondstate' },
  { label: 'Heydesk', value: 'heydesk' },
];

const floorData = [
  { label: 'Floor1', value: 'floor1' },
  { label: 'Floor2', value: 'floor2' },
];

const AddMeetingRoomModal = ({ modelTitle, modalOpen, toggleModal, intl }) => {
  const { messages } = intl;

  const [selectedOption, setSelectedOption] = useState('');
  const [floorOption, setFloorOption] = useState('');
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [availableTo, setAvailableTo] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [files, setFiles] = useState('');

  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(false);

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
                <Row>
                  <Colxx>
                    <Label className="form-group has-float-label">
                      <Input
                        type="textarea"
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
                      <Input type="text" placeholder={messages['label.city']} />
                      <span>
                        <IntlMessages id="label.city" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
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
                      <Input type="text" placeholder={messages['label.zip']} />
                      <span>
                        <IntlMessages id="label.zip" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
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
        <Button color="primary" size="sm" onClick={toggleModal}>
          <IntlMessages id="model.add" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default injectIntl(AddMeetingRoomModal);
