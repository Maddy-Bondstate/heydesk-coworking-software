import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { DASHBOARD_GET_CALENDAR_LIST } from '../actions';
import {
  getDashboardCalendarListSuccess,
  getDashboardCalendarListError,
} from './actions';
import { getCurrentUser } from '../../helpers/Utils';

const currentUser = getCurrentUser();
const token = `JWT ${currentUser?.token}`;

const axiosConfig = {
  headers: {
    Authorization: token,
  },
};

////////////----------- CALENDAR -----------////////////

// --------- GET ---------//
const getDashboardCalendarListRequest = async (data) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .get('https://hd-coworking.herokuapp.com/api/service/calender/list/', {
      params: data,
      headers: axiosConfig.headers,
    })
    .then((response) => response)
    .catch((error) => error);
};

function* getDashboardCalendarListItems({ payload }) {
  try {
    const response = yield call(getDashboardCalendarListRequest, payload);
    yield put(getDashboardCalendarListSuccess(response));
  } catch (error) {
    yield put(getDashboardCalendarListError(error));
  }
}

export function* watchGetCalendarList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(DASHBOARD_GET_CALENDAR_LIST, getDashboardCalendarListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetCalendarList)]);
}