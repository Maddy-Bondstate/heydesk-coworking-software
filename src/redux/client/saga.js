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
import { getCurrentUser } from '../../helpers/Utils';
import { api } from '../../constants/defaultValues';

const currentUser = getCurrentUser();
const token = `JWT ${currentUser?.token}`;

const axiosConfig = {
  headers: {
    Authorization: token,
  },
};

// ------------------------- BOOKING ----------------------- //

// GET BOOKING
const getClientBookingListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}service/booking/list/`, axiosConfig)
    .then((response) => response)
    .catch((error) => error);
};

function* getClientBookingListItems() {
  try {
    const response = yield call(getClientBookingListRequest);
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
const addClientBookingRequest = async (data, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(`${api}service/booking/`, data, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(`${api}service/booking/update/${id}/`, data, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(`${api}space/location/update/${id}/`, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addClientBooking({ payload, method }) {
  try {
    const response = yield call(addClientBookingRequest, payload, method);
    yield put(addClientBookingSuccess(response));
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
const getClientCustomerListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}service/customer/list/`, axiosConfig)
    .then((response) => response)
    .catch((error) => error);
};

function* getClientCustomerListItems() {
  try {
    const response = yield call(getClientCustomerListRequest);
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
const addClientCustomerRequest = async (data, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(`${api}service/customer/`, data, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(`${api}service/customer/update/${id}/`, data, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(`${api}space/location/update/${id}/`, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addClientCustomer({ payload, method }) {
  try {
    const response = yield call(addClientCustomerRequest, payload, method);
    yield put(addClientCustomerSuccess(response));
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
