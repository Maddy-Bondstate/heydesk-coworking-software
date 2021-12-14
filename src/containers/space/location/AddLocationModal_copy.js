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

import 'react-datepicker/dist/react-datepicker.css';

const AddLocationModal = ({ modelTitle, modalOpen, toggleModal, intl }) => {
  const { messages } = intl;

  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [startBusinessHour, setStartBusinessHour] = useState(
    new Date(moment().format('YYYY-MM-DDT09:00'))
  );
  const [endBusinessHour, setEndBusinessHour] = useState(
    new Date(moment().format('YYYY-MM-DDT17:00'))
  );
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
                  Address
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeFirstTab}>
              <TabPane tabId="1">
                <Row>
                  <Colxx sm="8">
                    <Label className="form-group has-float-label">
                      <Input type="text" placeholder={messages['label.name']} />
                      <span>
                        <IntlMessages id="label.name" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="4">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
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

export default injectIntl(AddLocationModal);
