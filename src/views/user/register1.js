import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';

const Register1 = ({ history }) => {
  const [email] = useState('demo@heydesk.com');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onUserRegister = () => {
    if (email !== '' && password !== '') {
      // history.push(adminRoot);
    }
    // call registerUserAction()
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="8" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h4">COWORKING PORTAL</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white separator">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="label.register" /> ({email})
            </CardTitle>
            <Form>
              <Row>
                <Colxx>
                  <FormGroup className="form-group has-float-label mb-4">
                    <Label>
                      <IntlMessages id="label.firstName" />
                    </Label>
                    <Input
                      type="name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="label.lastName" />
                    </Label>
                    <Input
                      type="name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </FormGroup>
                </Colxx>
              </Row>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="label.password" />
                </Label>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="new-password"
                />
              </FormGroup>

              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  <IntlMessages id="label.register" />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register1);
