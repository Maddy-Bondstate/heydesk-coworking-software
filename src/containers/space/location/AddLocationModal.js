import React, { useState,useEffect } from 'react';
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
//import { NotificationManager } from '../../components/common/react-notifications';
import 'rc-switch/assets/index.css';
import { injectIntl } from 'react-intl';
//import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import IntlMessages from '../../../helpers/IntlMessages';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import TimezoneSelect from 'react-timezone-select';

import { SpaceaddLocation } from '../../../redux/actions';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

const AddLocationModal = ({ 
  modelTitle, 
  modalOpen, 
  toggleModal, 
  intl, 
  loading, 
  locat,
  SpaceaddLocationAction,
 }) => {
  const { messages = '' } = intl || {};

  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [startBusinessHour, setStartBusinessHour] = useState(
    new Date(moment().format('YYYY-MM-DDT09:00'))
    
    
  );
  const [endBusinessHour, setEndBusinessHour] = useState(
    new Date(moment().format('YYYY-MM-DDT17:00'))
  );
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [files, setFiles] = useState('');
  const [state, setState] = React.useState({
      name: "",
      unique_code: "",
      description:"",
      address:"",
      city:"",
      country:"",
      zip:"",
      state: ""
  })

  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(false);
console.log("locat_test",locat)

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const getValues = (e) => {
    //console.log('val',e.target.value);
    const value = e.target.value;

    //console.log("name",e.target.name);
    setState({
      ...state,
      [e.target.name]: value
    });
  //  console.log(state);
  }

 
  

  const removeFile = () => {
    setFiles('');
    setTimeout(() => (document.getElementById('fileupload').value = ''), 50);
  };

  const submitLocation = () => {
    const image = (files==""?null:files.name);
     const start_time = startBusinessHour;
     const end_time = endBusinessHour;
     const time_zone = selectedTimezone.label;
     const is_open = checkedPrimarySmall;
    
    // console.log('selectedTimezone',selectedTimezone.label);
     //console.log('startBusinessHour',startBusinessHour);
    // console.log('endBusinessHour',endBusinessHour);
    SpaceaddLocationAction(state,image,start_time,end_time,time_zone,is_open);
    toggleModal();
    
  }

  return loading ? (
    <div className="loading" />
  ) : (
    <div>
  

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
                      <Input type="text" onChange={getValues} name="name" placeholder={messages['label.name']} />
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
                        onChange = {getValues}
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
                    name = "description"
                    onChange={getValues}
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
                        name="from_time"
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
                        name="to_time"
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
                        onChange={getValues} name="address"
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
                      <Input type="text" onChange={getValues} name="city" placeholder={messages['label.city']} />
                      <span>
                        <IntlMessages id="label.city" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text"
                        onChange={getValues} name="state"
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
                      <Input type="text" onChange={getValues} name="zip" placeholder={messages['label.zip']} />
                      <span>
                        <IntlMessages id="label.zip" />
                      </span>
                    </Label>
                  </Colxx>
                  <Colxx sm="6">
                    <Label className="form-group has-float-label">
                      <Input
                        type="text" onChange={getValues} name="country"
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
        <Button color="primary" size="sm" onClick={submitLocation}>
          <IntlMessages id="model.add" />
        </Button>
      </ModalFooter>
    </Modal>
  
 
 </div>  
  );
};

const mapStateToProps = ({ space }) => {
  //console.log('space',space);
  // const { location, loading } = space;
  // return { location, loading };
  const { loading } = space;
  return { loading };
};

export default connect(mapStateToProps, {
  SpaceaddLocationAction : SpaceaddLocation,
})(AddLocationModal);

//export default injectIntl(AddLocationModal);


