import React, { useState, useLayoutEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';

import { addSettingsProfile } from '../../../redux/actions';
import { connect } from 'react-redux';

const AddProfileModal = (props) => {
  const {
    modelTitle,
    modalOpen,
    item,
    intl,
    toggleModal,
    loading,
    addSettingsProfileAction,
  } = props;

  const { messages } = intl;
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useLayoutEffect(() => {
    setState({
      ...state,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
    });
  }, [item]);

  const handleChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    addSettingsProfileAction(state);
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modelTitle} />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Colxx>
            <Label className="form-group has-float-label">
              <Input
                type="text"
                name="first_name"
                value={state.first_name}
                onChange={handleChangeValue}
                placeholder={messages['label.first_name']}
              />
              <span>
                <IntlMessages id="label.first_name" />
              </span>
            </Label>
            <Label className="form-group has-float-label">
              <Input
                type="text"
                name="last_name"
                value={state.last_name}
                onChange={handleChangeValue}
                placeholder={messages['label.last_name']}
              />
              <span>
                <IntlMessages id="label.last_name" />
              </span>
            </Label>
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
          <Button color="primary" size="sm" onClick={handleSubmit}>
            <IntlMessages id="model.add" />
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ settings }) => {
  const { loading, profile, addProfile, error } = settings;
  return { loading, profile, addProfile, error };
};

export default injectIntl(
  connect(mapStateToProps, {
    addSettingsProfileAction: addSettingsProfile,
  })(AddProfileModal)
);
