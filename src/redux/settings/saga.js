import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SETTINGS_ADD_PROFILE } from '../actions';
import { addSettingsProfileSuccess, addSettingsProfileError } from './actions';
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

// ADD PROFILE
const addSettingsProfileRequest = async (data, method) => {
  // eslint-disable-next-line no-return-await

  //   if (method === 'POST') {
  //     return await axios
  //       .post(`${api}service/customer/`, data, axiosConfig)
  //       .then((response) => response)
  //       .catch((error) => error);
  //   }

  if (method === 'PUT') {
    const id = data.id;
    delete data['id'];

    return await axios
      .put(`${api}profile/update/${id}/`, data, axiosConfig)
      .then((response) => response)
      .catch((error) => error);
  }

  //   if (method === 'DELETE') {
  //     const id = data.id;
  //     delete data['id'];

  //     return await axios
  //       .delete(`${api}space/location/update/${id}/`, axiosConfig)
  //       .then((response) => response)
  //       .catch((error) => error);
  //   }
};

function* addSettingsProfile({ payload, method }) {
  try {
    const response = yield call(addSettingsProfileRequest, payload, method);
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
  yield all([fork(watchAddSettingsProfile)]);
}
