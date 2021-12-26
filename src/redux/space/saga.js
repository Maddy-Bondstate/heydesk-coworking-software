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

//--------------------- LOCATION ---------------------//

// GET
const getSpaceLocationListRequest = async (token) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}space/location/list/`, axiosConfig(token))
    .then((response) => response)
    .catch((error) => error);
};

function* getSpaceLocationListItems(action) {
  try {
    const { token } = action;
    const response = yield call(getSpaceLocationListRequest, token);
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
const addSpaceLocationRequest = async (data, token, method) => {
  // eslint-disable-next-line no-return-await
  if (method === 'POST') {
    const form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return await axios
      .post(`${api}space/location/`, form_data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    const form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }

    return await axios
      .put(`${api}space/location/update/${id}/`, form_data, axiosConfig(token))
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

function* addSpaceLocation(action) {
  try {
    const { payload, token, method } = action;
    const response = yield call(
      addSpaceLocationRequest,
      payload,
      token,
      method
    );
    yield put(addSpaceLocationSuccess(response));
    // window.location.reload();
  } catch (error) {
    yield put(addSpaceLocationError(error));
  }
}

export function* watchAddLocation() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_ADD_LOCATION, addSpaceLocation);
}

// --------- ADD FLOOR ---------//
const addSpaceLocationFloorRequest = async (data, token, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    const form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }

    return await axios
      .post(`${api}space/floor/`, form_data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    const form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }

    return await axios
      .put(`${api}space/floor/update/${id}/`, form_data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(`${api}space/floor/update/${id}/`, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addSpaceLocationFloor(action) {
  try {
    const { payload, token, method } = action;
    const response = yield call(
      addSpaceLocationFloorRequest,
      payload,
      token,
      method
    );
    yield put(addSpaceLocationFloorSuccess(response));
    // window.location.reload();
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
const getSpaceMeetingListRequest = async (data, token) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}space/objects/list/`, {
      params: data,
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response)
    .catch((error) => error);
};

function* getSpaceMeetingListItems(action) {
  try {
    const { payload, token } = action;
    const response = yield call(getSpaceMeetingListRequest, payload, token);
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
const addSpaceMeetingRequest = async (data, token, method) => {
  // eslint-disable-next-line no-return-await

  if (method === 'POST') {
    return await axios
      .post(`${api}space/objects/`, data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(`${api}space/objects/update/${id}/`, data, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }

  if (method === 'DELETE') {
    const id = data.id;
    delete data['id'];

    return await axios
      .delete(`${api}space/objects/update/${id}/`, axiosConfig(token))
      .then((response) => response)
      .catch((error) => error);
  }
};

function* addSpaceMeeting(action) {
  try {
    const { payload, token, method } = action;
    const response = yield call(addSpaceMeetingRequest, payload, token, method);
    yield put(addSpaceMeetingSuccess(response));

    window.location.reload();
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
