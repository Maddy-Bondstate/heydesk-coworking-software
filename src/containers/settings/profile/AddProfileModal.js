import React, { useState, useLayoutEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
  Label,
  Input,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';

import { addSettingsProfile } from '../../../redux/actions';
import { connect } from 'react-redux';

const AddProfileModal = (props) => {
  const {
    token,
    item,
    intl,
    loading,
    addProfile,
    error,
    addSettingsProfileAction,
  } = props;

  const { messages } = intl;
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [fetchProfile, setFetchProfile] = useState(false);
  const [files, setFiles] = useState(null);
  const [getImage, setGetImage] = useState('');

  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    insta_id: '',
    address_data: '',
    zipcode: '',
    country: '',
    city: '',
    company: '',
    currency: '',
    birthday: '0000-00-00',
  });

  useLayoutEffect(() => {
    if (item) {
      const birth =
        item.birthday === '01/01/2022' ? null : item.birthday?.split('/');
      setState({
        ...state,
        first_name: item.first_name || '',
        last_name: item.last_name || '',
        email: item.email || '',
        phone: item.phone || '',
        insta_id: item.insta_id || '',
        address_data: item.address_data || '',
        zipcode: item.zipcode || '',
        country: item.country || '',
        city: item.city || '',
        company: item.company || '',
        currency: item.currency || '',
        birthday: birth ? `${birth[2]}-${birth[1]}-${birth[0]}` : '0000-00-00',
      });

      item.image && setGetImage(item.image);
      if (!loading && addProfile && !fetchProfile) {
        window.location.reload();
      }
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

  const onChangeImage = (e) => {
    setFiles(e.target.files[0]);
  };

  const removeFile = () => {
    if (getImage === '') setFiles(null);
    else setGetImage('');

    setTimeout(() => (document.getElementById('fileupload').value = ''), 50);
  };

  const handleSubmit = () => {
    const birthh = state.birthday.split('-');
    const birthdays = `${birthh[2]}/${birthh[1]}/${birthh[0]}`;
    let data = {
      ...state,
      birthday: birthdays,
    };

    if (getImage === '' && files) {
      data = {
        ...data,
        image: files,
      };
    }

    addSettingsProfileAction(data, token);

    if (error) {
      console.log('error', error);
      NotificationManager.warning(error, 'Profile Error', 3000, null, null, '');
    }
    setFetchProfile(false);
  };

  console.log(state);

  return (
    <Row>
      <Colxx xxs="12" sm="9" md="8" lg="6" className="mb-2">
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
              <Colxx sm="6">
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
              </Colxx>
              <Colxx sm="6">
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

            <Label className="form-group has-float-label">
              <Input
                type="text"
                name="phone"
                value={state.phone}
                onChange={handleChangeValue}
                placeholder={messages['label.phone']}
              />
              <span>
                <IntlMessages id="label.phone" />
              </span>
            </Label>

            <Label className="form-group has-float-label">
              <Input
                type="text"
                name="insta_id"
                value={state.insta_id}
                onChange={handleChangeValue}
                placeholder={messages['label.insta']}
              />
              <span>
                <IntlMessages id="label.insta" />
              </span>
            </Label>

            {/* <Label className="form-group has-float-label">
              <Input
                type="text"
                name="company"
                value={state.company}
                onChange={handleChangeValue}
                placeholder={messages['label.company']}
              />
              <span>
                <IntlMessages id="label.company" />
              </span>
            </Label> */}

            {/* <Label className="form-group has-float-label">
              <select
                type="text"
                name="currency"
                value={state.currency}
                onChange={handleChangeValue}
                placeholder={messages['label.currency']}
              >
                <option>EUR</option>
                <option>USD</option>
              </select>
              <span>
                <IntlMessages id="label.currency" />
              </span>
            </Label> */}

            <Label className="form-group has-float-label">
              <Input
                type="date"
                name="birthday"
                value={state.birthday}
                onChange={handleChangeValue}
                placeholder={messages['label.birthday']}
              />
              <span>
                <IntlMessages id="label.birthday" />
              </span>
            </Label>

            <Row>
              <Colxx className="form-group">
                <Label className="mr-4">
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
                        getImage !== '' ? getImage : URL.createObjectURL(files)
                      }
                      alt=""
                      width="150"
                    />
                    <span onClick={removeFile} className="ml-3 cursor-pointer">
                      <i className="fa fa-times-circle fa-2x text-secondary" />
                    </span>
                  </Label>
                )}
              </Colxx>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Colxx>
                <Label className="form-group has-float-label">
                  <Input
                    type="text"
                    name="address_data"
                    value={state.address_data}
                    onChange={handleChangeValue}
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
                  <Input
                    type="text"
                    name="country"
                    value={state.country}
                    onChange={handleChangeValue}
                    placeholder={messages['label.country']}
                  />
                  <span>
                    <IntlMessages id="label.country" />
                  </span>
                </Label>
              </Colxx>
              <Colxx sm="6">
                <Label className="form-group has-float-label">
                  <Input
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChangeValue}
                    placeholder={messages['label.city']}
                  />
                  <span>
                    <IntlMessages id="label.city" />
                  </span>
                </Label>
              </Colxx>
              <Colxx sm="6">
                <Label className="form-group has-float-label">
                  <Input
                    type="text"
                    name="zipcode"
                    value={state.zipcode}
                    onChange={handleChangeValue}
                    placeholder={messages['label.zip']}
                  />
                  <span>
                    <IntlMessages id="label.zip" />
                  </span>
                </Label>
              </Colxx>
            </Row>
          </TabPane>

          {loading ? (
            <div className="loading" />
          ) : (
            <Button color="primary" size="sm" onClick={handleSubmit}>
              <IntlMessages id="forms.save" />
            </Button>
          )}
        </TabContent>
      </Colxx>
    </Row>
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
