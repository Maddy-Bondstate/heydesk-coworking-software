import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  CLIENT_GET_BOOKING_LIST,
  CLIENT_ADD_BOOKING,
  CLIENT_GET_CUSTOMER_LIST,
  CLIENT_ADD_CUSTOMER,
} from '../actions';
import {
  getClientBookingListSuccess,
  getClientBookingListError,
  addClientBookingSuccess,
  addClientBookingError,
  getClientCustomerListSuccess,
  getClientCustomerListError,
  addClientCustomerSuccess,
  addClientCustomerError,
} from './actions';
// import { getCurrentUser } from '../../helpers/Utils';
import { api } from '../../constants/defaultValues';

// const currentUser = getCurrentUser();
// const token = `JWT ${currentUser?.token}`;

// const axiosConfig = {
//   headers: {
//     Authorization: token,
//   },
// };

const axiosConfig = (token) => {
  return {
    headers: {
      Authorization: token,
    },
  };
};

// ------------------------- BOOKING ----------------------- //

// GET BOOKING
const getClientBookingListRequest = async (token) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}service/booking/list/`, axiosConfig(token))
    .then((response) => response)
    .catch((error) => error);
};

function* getClientBookingListItems(action) {
  try {
    const { token } = action;
    const response = yield call(getClientBookingListRequest, token);
    yield put(getClientBookingListSuccess(response));
  } catch (error) {
    yield put(getClientBookingListError(error));
  }
}

export function* watchGetClientBookingList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(CLIENT_GET_BOOKING_LIST, getClientBookingListItems);
}

// ADD BOOKING
const addClientBookingRequest = async (data, token, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(`${api}service/booking/`, data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(`${api}service/booking/update/${id}/`, data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(`${api}space/location/update/${id}/`, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addClientBooking(action) {
  try {
    const { payload, token, method } = action;
    const response = yield call(
      addClientBookingRequest,
      payload,
      token,
      method
    );
    yield put(addClientBookingSuccess(response));
    // window.location.reload();
  } catch (error) {
    yield put(addClientBookingError(error));
  }
}

export function* watchAddClientBooking() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(CLIENT_ADD_BOOKING, addClientBooking);
}

// ------------------------- CUSTOMER ----------------------- //

// GET CUSTOMER
const getClientCustomerListRequest = async (token) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}service/customer/list/`, axiosConfig(token))
    .then((response) => response)
    .catch((error) => error);
};

function* getClientCustomerListItems(action) {
  try {
    const { token } = action;
    const response = yield call(getClientCustomerListRequest, token);
    yield put(getClientCustomerListSuccess(response));
  } catch (error) {
    yield put(getClientCustomerListError(error));
  }
}

export function* watchGetClientCustomerList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(CLIENT_GET_CUSTOMER_LIST, getClientCustomerListItems);
}

// ADD CUSTOMER
const addClientCustomerRequest = async (data, token, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(`${api}service/customer/`, data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(`${api}service/customer/update/${id}/`, data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(`${api}space/location/update/${id}/`, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addClientCustomer(action) {
  try {
    const { payload, token, method } = action;
    const response = yield call(
      addClientCustomerRequest,
      payload,
      token,
      method
    );
    yield put(addClientCustomerSuccess(response));
    // window.location.reload();
  } catch (error) {
    yield put(addClientCustomerError(error));
  }
}

export function* watchAddClientCustomer() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(CLIENT_ADD_CUSTOMER, addClientCustomer);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetClientBookingList),
    fork(watchAddClientBooking),
    fork(watchGetClientCustomerList),
    fork(watchAddClientCustomer),
  ]);
}
