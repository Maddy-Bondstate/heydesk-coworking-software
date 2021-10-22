import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SPACE_GET_LOCATION_LIST } from '../actions';
import {
  getSpaceLocationListSuccess,
  getSpaceLocationListError,
} from './actions';
import { getCurrentUser } from '../../helpers/Utils';

const currentUser = getCurrentUser();
const token = `JWT ${currentUser?.token}`;

// --------- Location ---------
const getSpaceLocationListRequest = async () => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get('https://hd-coworking.herokuapp.com/api/space/location/list/', {
      headers: {
        Authorization: token,
      },
    })
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

// --------- Desk ---------
// --------- Meeting Room ---------
// --------- Private Cabin ---------
// --------- Conference Room ---------

export default function* rootSaga() {
  yield all([fork(watchGetLocationList)]);
}
