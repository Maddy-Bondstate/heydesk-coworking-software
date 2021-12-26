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
    token,
    modelTitle,
    modalOpen,
    toggleModal,
    intl,
    loading,
    addLocationFloor,
    addSpaceLocationFloorAction,
    item,
    locationList,
    handleGetSpaceLocation,
    modalDeleteIdsq,
    setModalDeleteIdsrrq,
  } = props;

  const { messages } = intl;

  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState(null);
  const [getImage, setGetImage] = useState('');
  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(true);
  const [fetchSpace, setFetchSpace] = useState(false);

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    if (getImage === '') setFiles(null);
    else setGetImage('');
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
    // console.log('--', item);
    if (item && item !== null) {
      setState({
        name: item.name,
        floor: item.floor,
        area: item.area,
        target: item.target,
      });

      item.image && setGetImage(item.image);

      setSelectedOption(item.location);
      setCheckedPrimarySmall(item.is_open);
    } else {
      setState({
        name: '',
        floor: '',
        area: '',
        target: '',
      });

      setFiles(files);
      setGetImage('');
      setSelectedOption(selectedOption);
      setCheckedPrimarySmall(checkedPrimarySmall);
    }

    if (locationList?.length > 0) {
      let selectData = [];
      locationList.map((l) => selectData.push({ label: l.name, value: l.id }));

      setLocationListData(selectData);
    }

    // console.log(modalDeleteIds);

    if (!loading && addLocationFloor && !fetchSpace && !modalDeleteIdsq) {
      // console.log('}}}}}}}}}}}}}}}}}}');
      setFetchSpace(true);
      handleGetSpaceLocation();
      toggleModal(!modalOpen);
    }

    // if (modalDeleteIds) setModalDeleteIdsrr(false);
  }, [
    item,
    locationList,
    modalOpen,
    toggleModal,
    loading,
    addLocationFloor,
    handleGetSpaceLocation,
    modalDeleteIdsq,
    setModalDeleteIdsrrq,
  ]);

  const handleChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmitLocationFloor = () => {
    if (
      state.name !== '' &&
      state.floor !== '' &&
      state.area !== '' &&
      state.target !== '' &&
      selectedOption &&
      selectedOption !== ''
    ) {
      let data = {
        ...state,
        location: selectedOption.value,
        is_open: checkedPrimarySmall,
      };

      if (getImage === '' && files) {
        data = {
          ...data,
          image: files,
        };
      }

      if (item)
        addSpaceLocationFloorAction({ ...data, id: item.id }, token, 'PUT');
      else addSpaceLocationFloorAction(data, token, 'POST');

      setFetchSpace(false);
    } else {
      document.getElementsByName('name')[0].style.border = '1px solid #d7d7d7';
      document.getElementsByName('floor')[0].style.border = '1px solid #d7d7d7';
      document.getElementsByName('area')[0].style.border = '1px solid #d7d7d7';
      document.getElementsByName('target')[0].style.border =
        '1px solid #d7d7d7';
      document.getElementById('location_field').style.border = 'unset';
      if (state.name === '') {
        document.getElementsByName('name')[0].focus();
        document.getElementsByName('name')[0].style.border = '1px solid orange';
        return;
      }
      if (selectedOption === '') {
        document.getElementById('location_field').style.border =
          '1px solid orange';
        return;
      }
      if (state.floor === '') {
        document.getElementsByName('floor')[0].focus();
        document.getElementsByName('floor')[0].style.border =
          '1px solid orange';
        return;
      }
      if (state.area === '') {
        document.getElementsByName('area')[0].focus();
        document.getElementsByName('area')[0].style.border = '1px solid orange';
        return;
      }
      if (state.target === '') {
        document.getElementsByName('target')[0].focus();
        document.getElementsByName('target')[0].style.border =
          '1px solid orange';
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
            id="location_field"
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
              type="number"
              name="area"
              value={state.area}
              onChange={handleChangeValue}
              placeholder={messages['label.area']}
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

        <Label className="form-group has-float-label">
          <InputGroup className="mb-3">
            <Input
              type="number"
              name="target"
              value={state.target}
              onChange={handleChangeValue}
              placeholder={messages['label.target']}
            />
            <InputGroupAddon addonType="append">$</InputGroupAddon>
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
            {!files && getImage === '' ? (
              <Label className="custom-image-attach-inline">
                <Input type="file" id="fileupload" onChange={onChangeImage} />
                <i className="fa fa-cloud-upload mr-2" /> Upload
              </Label>
            ) : (
              <Label>
                <img
                  src={getImage !== '' ? getImage : URL.createObjectURL(files)}
                  alt=""
                  width="150"
                />
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

const mapStateToProps = ({ space }) => {
  const { addLocationFloor, loading } = space;
  return { addLocationFloor, loading };
};

export default injectIntl(
  connect(mapStateToProps, {
    addSpaceLocationFloorAction: addSpaceLocationFloor,
  })(AddFloorModal)
);
