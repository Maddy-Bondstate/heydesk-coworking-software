import React, { useState, useLayoutEffect } from 'react';
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

import { addSpaceLocationFloor } from '../../../redux/actions';
import { connect } from 'react-redux';

const AddFloorModal = (props) => {
  const {
    modelTitle,
    modalOpen,
    toggleModal,
    intl,
    loading,
    addLocationFloor,
    addSpaceLocationFloorAction,
    item,
    locationList,
  } = props;

  const { messages } = intl;

  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState('');
  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(false);

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    setFiles('');
    setTimeout(() => (document.getElementById('fileupload').value = ''), 50);
  };

  const [locationListData, setLocationListData] = useState([]);

  const [state, setState] = useState({
    name: '',
    floor: '',
    area: '',
    target: '',
  });

  useLayoutEffect(() => {
    console.log('FLOOR', item);
    if (item !== null) {
      setState({
        ...state,
        name: item.name,
        floor: item.floor,
        area: item.area,
        target: item.target,
      });

      // console.log(item.location);

      setSelectedOption(item.location);
      setCheckedPrimarySmall(item.is_open);
    }

    if (locationList?.length > 0) {
      // locationList;
      let selectData = [];
      locationList.map((l) => selectData.push({ label: l.name, value: l.id }));

      // console.log(selectData);

      setLocationListData(selectData);
      // const selectData = [
      //   { label: 'Bondstate', value: 'bondstate' },
      //   { label: 'Heydesk', value: 'heydesk' },
      // ];
    }
  }, [item]);

  const handleChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmitLocationFloor = () => {
    const data = {
      ...state,
      image: null,
      location: selectedOption.value,
      is_open: checkedPrimarySmall,
    };

    if (item) {
      console.log('PUT', item);
      addSpaceLocationFloorAction({ ...data, id: item.id }, 'PUT');
    } else {
      console.log('POST', item);
      addSpaceLocationFloorAction(data, 'POST');
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modelTitle} />
      </ModalHeader>
      <ModalBody>
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
            value={selectedOption}
            onChange={setSelectedOption}
            options={locationListData}
          />
          <span>
            <IntlMessages id="label.location" />
          </span>
        </Label>

        <Label className="form-group has-float-label">
          <Input
            type="text"
            name="floor"
            value={state.floor}
            onChange={handleChangeValue}
            placeholder={messages['label.floor']}
          />
          <span>
            <IntlMessages id="label.floor" />
          </span>
        </Label>

        <Label className="form-group has-float-label">
          <InputGroup className="mb-3">
            <Input
              name="area"
              value={state.area}
              onChange={handleChangeValue}
              placeholder={messages['label.area']}
            />
            <InputGroupAddon addonType="append">ft2</InputGroupAddon>
          </InputGroup>
          <span>
            <IntlMessages id="label.area" />
          </span>
        </Label>

        <Label className="form-group has-float-label">
          <InputGroup className="mb-3">
            <Input
              name="target"
              value={state.target}
              onChange={handleChangeValue}
              placeholder={messages['label.target']}
            />
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
        {loading ? (
          <div className="loading" />
        ) : (
          <Button color="primary" size="sm" onClick={handleSubmitLocationFloor}>
            <IntlMessages id="model.add" />
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

// export default injectIntl(AddFloorModal);
const mapStateToProps = ({ space }) => {
  const { addLocationFloor, loading } = space;
  return { addLocationFloor, loading };
};

export default injectIntl(
  connect(mapStateToProps, {
    addSpaceLocationFloorAction: addSpaceLocationFloor,
  })(AddFloorModal)
);
