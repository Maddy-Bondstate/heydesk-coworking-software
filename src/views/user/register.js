import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';

import { registerUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const validateFirstName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter firstname';
  } else if (value.length < 3) {
    error = 'Firstname must be atleast 3 character';
  }
  return error;
};

const validateLastName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter lastname';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 6) {
    error = 'Password must be atleast 6 characters';
  }
  return error;
};

const Register = ({ history, loading, error, registerUserAction }) => {
  const [firstName] = useState('');
  const [lastName] = useState('');
  const [email1, setEmail1] = useState('');
  const [password] = useState('');

  const searchParams = new URLSearchParams(history.location.search);
  const invite = searchParams.get('invite');

  useEffect(() => {
    if (invite) {
      const atob = (str) => Buffer.from(str, 'base64').toString('binary');
      const decrypt1 = atob(invite);
      const decrypt2 = atob(decrypt1);
      setEmail1(decrypt2);
    }

    if (error) {
      NotificationManager.warning(
        error,
        'Register Error',
        3000,
        null,
        null,
        ''
      );
    }
  }, [invite, error]);

  const onUserRegister = (values) => {
    if (values.email1 === '') values.email1 = email1;

    if (!loading) {
      if (
        values.firstName !== '' &&
        values.lastName !== '' &&
        values.email1 !== '' &&
        values.password !== ''
      ) {
        registerUserAction(values, history);
      }
    }
  };

  const initialValues = { firstName, lastName, email1, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="7" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side">
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
            {/* <NavLink to="/" className="white"> */}
            <span className="logo-single" />
            {/* </NavLink> */}
            <CardTitle className="mb-4">
              <IntlMessages id="label.register" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="label.firstName" />
                    </Label>
                    <Field
                      className="form-control"
                      name="firstName"
                      validate={validateFirstName}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="invalid-feedback d-block">
                        {errors.firstName}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="label.lastName" />
                    </Label>
                    <Field
                      className="form-control"
                      name="lastName"
                      validate={validateLastName}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="invalid-feedback d-block">
                        {errors.lastName}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="label.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email1"
                      validate={invite || validateEmail}
                      // value={email1}
                      disabled={invite || ''}
                    />
                    {errors.email1 && touched.email1 && (
                      <div className="invalid-feedback d-block">
                        {errors.email1}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="label.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                      autoComplete="new-password"
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-end align-items-center">
                    {/* <NavLink to="/user/forgot-password">
                      <IntlMessages id="label.forgot-password" />
                    </NavLink> */}
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="label.register" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
