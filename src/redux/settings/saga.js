import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SETTINGS_GET_PROFILE_LIST, SETTINGS_ADD_PROFILE } from '../actions';
import {
  getSettingsProfileListSuccess,
  getSettingsProfileListError,
  addSettingsProfileSuccess,
  addSettingsProfileError,
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

// ------------------------- SETTINGS ----------------------- //

// GET PROFILE
const getSettingsProfileListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get(`${api}auth/user/`, axiosConfig)
    .then((response) => response)
    .catch((error) => error);
};

function* getSettingsProfileListItems() {
  try {
    const response = yield call(getSettingsProfileListRequest);
    yield put(getSettingsProfileListSuccess(response));
  } catch (error) {
    yield put(getSettingsProfileListError(error));
  }
}

export function* watchGetSettingsProfileList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SETTINGS_GET_PROFILE_LIST, getSettingsProfileListItems);
}
// ADD PROFILE
const addSettingsProfileRequest = async (data) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .put(`${api}profile/update/`, data, axiosConfig)
    .then((response) => response)
    .catch((error) => error);
};

function* addSettingsProfile({ payload }) {
  try {
    const response = yield call(addSettingsProfileRequest, payload);
    yield put(addSettingsProfileSuccess(response));
    window.location.reload();
  } catch (error) {
    yield put(addSettingsProfileError(error));
  }
}

export function* watchAddSettingsProfile() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SETTINGS_ADD_PROFILE, addSettingsProfile);
}

export default function* rootSaga() {
  yield all([fork(watchAddSettingsProfile), fork(watchGetSettingsProfileList)]);
}
