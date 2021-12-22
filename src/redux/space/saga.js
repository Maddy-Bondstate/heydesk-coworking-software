import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  SPACE_GET_LOCATION_LIST,
  SPACE_ADD_LOCATION,
  SPACE_ADD_LOCATION_FLOOR,
  SPACE_GET_MEETING_LIST,
  SPACE_ADD_MEETING,
} from '../actions';
import {
  getSpaceLocationListSuccess,
  getSpaceLocationListError,
  addSpaceLocationSuccess,
  addSpaceLocationError,
  addSpaceLocationFloorSuccess,
  addSpaceLocationFloorError,
  getSpaceMeetingListSuccess,
  getSpaceMeetingListError,
  addSpaceMeetingSuccess,
  addSpaceMeetingError,
} from './actions';
import { getCurrentUser } from '../../helpers/Utils';

const currentUser = getCurrentUser();
const token = `JWT ${currentUser?.token}`;

const axiosConfig = {
  headers: {
    Authorization: token,
  },
};

////////////----------- LOCATION -----------////////////

// --------- GET ---------//
const getSpaceLocationListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(
      'https://hd-coworking.herokuapp.com/api/space/location/list/',
      axiosConfig
    )
    .then((response) => response)
    .catch((error) => error);
};

function* getSpaceLocationListItems() {
  try {
    const response = yield call(getSpaceLocationListRequest);
    yield put(getSpaceLocationListSuccess(response));
  } catch (error) {
    yield put(getSpaceLocationListError(error));
  }
}

export function* watchGetLocationList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_GET_LOCATION_LIST, getSpaceLocationListItems);
}

// --------- ADD ---------//
const addSpaceLocationRequest = async (data, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(
        'https://hd-coworking.herokuapp.com/api/space/location/',
        data,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(
        `https://hd-coworking.herokuapp.com/api/space/location/update/${id}/`,
        data,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(
        `https://hd-coworking.herokuapp.com/api/space/location/update/${id}/`,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addSpaceLocation({ payload, method }) {
  try {
    const response = yield call(addSpaceLocationRequest, payload, method);
    yield put(addSpaceLocationSuccess(response));
  } catch (error) {
    yield put(addSpaceLocationError(error));
  }
}

export function* watchAddLocation() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_ADD_LOCATION, addSpaceLocation);
}

// --------- ADD FLOOR ---------//
const addSpaceLocationFloorRequest = async (data, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(
        'https://hd-coworking.herokuapp.com/api/space/floor/',
        data,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(
        `https://hd-coworking.herokuapp.com/api/space/floor/update/${id}/`,
        data,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(
        `https://hd-coworking.herokuapp.com/api/space/floor/update/${id}/`,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addSpaceLocationFloor({ payload, method }) {
  try {
    const response = yield call(addSpaceLocationFloorRequest, payload, method);
    yield put(addSpaceLocationFloorSuccess(response));
  } catch (error) {
    yield put(addSpaceLocationFloorError(error));
  }
}

export function* watchAddLocationFloor() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_ADD_LOCATION_FLOOR, addSpaceLocationFloor);
}

////////////----------- DESK -----------////////////

////////////----------- MEETING -----------////////////
// --------- GET ---------//
const getSpaceMeetingListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(
      'https://hd-coworking.herokuapp.com/api/space/objects/list/',
      axiosConfig
    )
    .then((response) => response)
    .catch((error) => error);
};

function* getSpaceMeetingListItems() {
  try {
    const response = yield call(getSpaceMeetingListRequest);
    yield put(getSpaceMeetingListSuccess(response));
  } catch (error) {
    yield put(getSpaceMeetingListError(error));
  }
}

export function* watchGetMeetingList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_GET_MEETING_LIST, getSpaceMeetingListItems);
}

// --------- ADD ---------//
const addSpaceMeetingRequest = async (data, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(
        'https://hd-coworking.herokuapp.com/api/space/objects/',
        data,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(
        `https://hd-coworking.herokuapp.com/api/space/objects/update/${id}/`,
        data,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(
        `https://hd-coworking.herokuapp.com/api/space/objects/update/${id}/`,
        axiosConfig
      )
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addSpaceMeeting({ payload, method }) {
  try {
    const response = yield call(addSpaceMeetingRequest, payload, method);
    yield put(addSpaceMeetingSuccess(response));
  } catch (error) {
    yield put(addSpaceMeetingError(error));
  }
}

export function* watchAddMeeting() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_ADD_MEETING, addSpaceMeeting);
}

////////////----------- PRIVATE -----------////////////
////////////----------- CONFERENCE -----------////////////

export default function* rootSaga() {
  yield all([
    fork(watchGetLocationList),
    fork(watchAddLocation),
    fork(watchAddLocationFloor),
    fork(watchGetMeetingList),
    fork(watchAddMeeting),
  ]);
}
