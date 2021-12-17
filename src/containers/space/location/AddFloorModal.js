import React, { useState,useEffect } from 'react';
import { injectIntl } from 'react-intl';

import {
  Row,
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

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { SpaceaddFloor } from '../../../redux/actions';
//import { addFloor } from 'containers/space/location'
import { connect } from 'react-redux';

const selectData = [
  { label: 'Bondstate', value: 'bondstate' },
  { label: 'Heydesk', value: 'heydesk' },
];

const AddFloorModal = ({ 
    modelTitle,
    modalOpen,
    toggleModal, 
    intl,
    floor,
    SpaceaddFloorAction 
    }) => {
  const { messages = '' } = intl || {};

  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState('');
  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(false);
  const [state, setState] = React.useState({
    name: "",
    floor: "",
    area:"",
    target:"",
})
console.log("floor_test",floor);
  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    setFiles('');
    setTimeout(() => (document.getElementById('fileupload').value = ''), 50);
  };

  const getValues = (e) => {
    //console.log('val',e.target.value);
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    //console.log(state);
  }

  // useEffect(() => {
  //  const image = (files==""?null:files.name);
  //  const company = selectedOption.value;
  //   SpaceaddFloorAction(company,state,image,checkedPrimarySmall);
  //   if (floor?.status==201) toggleModal;
    
  // },[SpaceaddFloorAction]);

  const submitFloor = () => {
    const image = (files==""?null:files.name);
    const company = selectedOption.value;
    //console.log("checkedPrimarySmall",checkedPrimarySmall);
     SpaceaddFloorAction(company,state,image,checkedPrimarySmall);
     toggleModal();
  }

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modelTitle} />
      </ModalHeader>
      <ModalBody>
        <Label className="form-group has-float-label">
          <Input onChange={getValues} name="name" type="text" placeholder={messages['label.name']} />
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
          <Input type="text" onChange={getValues} name="floor" placeholder={messages['label.floor']} />
          <span>
            <IntlMessages id="label.floor" />
          </span>
        </Label>

        <Label className="form-group has-float-label">
          <InputGroup className="mb-3">
            <Input type="text" onChange={getValues} name="area" placeholder={messages['label.area']} />
            <InputGroupAddon addonType="append">ft2</InputGroupAddon>
          </InputGroup>
          <span>
            <IntlMessages id="label.area" />
          </span>
        </Label>

        <Label className="form-group has-float-label">
          <InputGroup className="mb-3">
            <Input type="text" onChange={getValues} name="target" placeholder={messages['label.target']} />
            <InputGroupAddon addonType="append">EUR</InputGroupAddon>
          </InputGroup>
          <span>
            <IntlMessages id="label.target" />
          </span>
        </Label>

        <Row>
          <Colxx className="form-group">
            <Label className="mr-4">
              <IntlMessages id="label.image" />
            </Label>
            {files === '' ? (
              <Label className="custom-image-attach-inline">
                <Input type="file" id="fileupload" onChange={onChangeImage} />
                <i className="fa fa-cloud-upload mr-2" /> Upload
              </Label>
            ) : (
              <Label>
                <img src={URL.createObjectURL(files)} alt="" width="150" />
                <span onClick={removeFile} className="ml-3 cursor-pointer">
                  <i className="fa fa-times-circle fa-2x text-secondary" />
                </span>
              </Label>
            )}

            <Label className="text-small text-secondary">
              Get in touch with us at <b>support@heydesk.com</b> to
              automatically upload your floor or read more about
              <b> how to make your floor interactive</b>.
            </Label>
          </Colxx>
        </Row>

        <Row>
          <Colxx className="mb-2">
            <Switch
              className="custom-switch custom-switch-primary custom-switch-small mr-3"
              checked={checkedPrimarySmall}
              onChange={(primary) => setCheckedPrimarySmall(primary)}
            />
            <IntlMessages id="label.isopen" />
          </Colxx>
        </Row>
        <Label className="text-small text-secondary">
          Check if the floor is operational.
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" size="sm" outline onClick={toggleModal}>
          <IntlMessages id="model.close" />
        </Button>
        <Button color="primary"  onClick={submitFloor} size="sm" >
          <IntlMessages id="model.add" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ space }) => {
 // console.log('floor',space);
  // const { location, loading } = space;
  // return { location, loading };
  const { loading } = space;
  return { loading };
};

export default connect(mapStateToProps, {
  SpaceaddFloorAction : SpaceaddFloor,
})(AddFloorModal);

//export default injectIntl(AddFloorModal);
