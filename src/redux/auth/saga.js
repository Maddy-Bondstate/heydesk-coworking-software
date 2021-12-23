import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  // FORGOT_PASSWORD,
  // RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  // forgotPasswordSuccess,
  // forgotPasswordError,
  // resetPasswordSuccess,
  // resetPasswordError,
} from './actions';

import { adminRoot, api } from '../../constants/defaultValues';
import { setCurrentUser } from '../../helpers/Utils';

// --------- Login ---------
const loginWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await axios
    .post(`${api}auth/login/`, {
      email,
      password,
    })
    .then((user) => user)
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);

    if (loginUser.status === 200) {
      const item = { token: loginUser.data.token, ...loginUser.data.user };
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push(adminRoot);

      // window.location.href = adminRoot;
    } else {
      yield put(loginUserError('Username or password does not match'));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

// --------- Register ---------
const registerWithEmailPasswordAsync = async (
  firstName,
  lastName,
  email1,
  password
) =>
  // eslint-disable-next-line no-return-await
  await axios
    .post(`${api}auth/registration/`, {
      first_name: firstName,
      last_name: lastName,
      email: email1,
      password1: password,
    })
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { firstName, lastName, email1, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      firstName,
      lastName,
      email1,
      password
    );

    if (registerUser.status === 201) {
      const item = {
        token: registerUser.data.token,
        ...registerUser.data.user,
      };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
      // window.location.href = adminRoot;
    } else {
      yield put(registerUserError('Email is already registered'));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

// --------- Logout ---------
const logoutAsync = async (history) => {
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

// --------- Forgot Password ---------
// const forgotPasswordAsync = async (email) => {
//   // eslint-disable-next-line no-return-await

// };

// function* forgotPassword({ payload }) {
//   const { email } = payload.forgotUserMail;
//   try {
//     const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
//     if (!forgotPasswordStatus) {
//       yield put(forgotPasswordSuccess('success'));
//     } else {
//       yield put(forgotPasswordError(forgotPasswordStatus.message));
//     }
//   } catch (error) {
//     yield put(forgotPasswordError(error));
//   }
// }

// export function* watchForgotPassword() {
//   // eslint-disable-next-line no-use-before-define
//   yield takeEvery(FORGOT_PASSWORD, forgotPassword);
// }

// --------- Reset Password ---------
// const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
//   // eslint-disable-next-line no-return-await

// };

// function* resetPassword({ payload }) {
//   const { newPassword, resetPasswordCode } = payload;
//   try {
//     const resetPasswordStatus = yield call(
//       resetPasswordAsync,
//       resetPasswordCode,
//       newPassword
//     );
//     if (!resetPasswordStatus) {
//       yield put(resetPasswordSuccess('success'));
//     } else {
//       yield put(resetPasswordError(resetPasswordStatus.message));
//     }
//   } catch (error) {
//     yield put(resetPasswordError(error));
//   }
// }
// export function* watchResetPassword() {
//   // eslint-disable-next-line no-use-before-define
//   yield takeEvery(RESET_PASSWORD, resetPassword);
// }

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    // fork(watchForgotPassword),
    // fork(watchResetPassword),
  ]);
}
