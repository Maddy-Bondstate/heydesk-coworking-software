import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SPACE_GET_LOCATION_LIST, SPACE_ADD_LOCATION } from '../actions';
import {
  getSpaceLocationListSuccess,
  getSpaceLocationListError,
  addSpaceLocationSuccess,
  addSpaceLocationError,
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
    yield call(addSpaceLocationRequest, payload, method);
    yield put(addSpaceLocationSuccess(true));
  } catch (error) {
    yield put(addSpaceLocationError(error));
  }
}

export function* watchAddLocation() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_ADD_LOCATION, addSpaceLocation);
}

////////////----------- DESK -----------////////////
////////////----------- MEETING -----------////////////
////////////----------- PRIVATE -----------////////////
////////////----------- CONFERENCE -----------////////////

export default function* rootSaga() {
  yield all([fork(watchGetLocationList), fork(watchAddLocation)]);
}
