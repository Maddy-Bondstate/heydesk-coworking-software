import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  SPACE_GET_LOCATION_LIST,
  ADD_FLOOR,
  ADD_LOCATION,
  SINGLE_SPACE,
} from '../actions';
//import cors from 'cors';
import {
  getSpaceLocationListSuccess,
  getSpaceLocationListError,
  SpaceaddFloorSuccess,
  SpaceaddFloorError,
  SpaceaddLocationSuccess,
  SpaceaddLocationError,
  SingleSpaceSuccess,
  SingleSpaceError,
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
        'Content-Type': 'application/json',
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
    // console.log('res55555555555', response);
  } catch (error) {
    yield put(getSpaceLocationListError(error));
  }
}

export function* watchGetLocationList() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SPACE_GET_LOCATION_LIST, getSpaceLocationListItems);
}

/* Single space details - Starts */

const SingleSpaceRequest = async (space_id) => {
  // eslint-disable-next-line no-return-await
  // const urrl = 'https://hd-coworking.herokuapp.com/api/space/location/retrieve/'+space_id+'/';
  // console.log("urrl",urrl);
  return await axios
    .get(
      'https://hd-coworking.herokuapp.com/api/space/location/retrieve/' +
        space_id +
        '/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    )
    .then((response) => response)
    .catch((error) => error);
};

function* SingleSpaceItems({ payload }) {
  //console.log('pyy',payload.space_id);
  //const space_id = payload.space_id;
  //console.log('space_bfg',space_id);
  try {
    const respo = yield call(SingleSpaceRequest, payload.space_id);
    yield put(SingleSpaceSuccess(respo));
    // console.log('res', respo);
  } catch (error) {
    yield put(SingleSpaceError(error));
  }
}

export function* watchSingleSpace() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(SINGLE_SPACE, SingleSpaceItems);
}

/* Single space details - Ends */

/* Add Floor - STARTS */

const addFloorRequest = async (
  company,
  name,
  floor,
  area,
  target,
  image,
  is_open
) => {
  const headerParams = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  return await axios({
    method: 'post',
    url: `https://hd-coworking.herokuapp.com/api/space/floor/`,
    params: {
      company: company,
      name: name,
      floor: floor,
      area: area,
      target: target,
      image: image,
      is_open: is_open,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

function* addFloorItems({ payload }) {
  //console.log('floor',payload.state);
  const { company } = payload.company;
  const { name, floor, area, target } = payload.state;
  const { image } = payload.image;
  const { is_open } = payload.isOpen;

  try {
    const addFloor = yield call(
      addFloorRequest,
      company,
      name,
      floor,
      area,
      target,
      image,
      is_open
    );
    yield put(SpaceaddFloorSuccess(addFloor));
    //console.log('adres',addFloor.status);
  } catch (error) {
    console.log(error);
    yield put(SpaceaddFloorError(error));
  }
}

export function* watchaddFloor() {
  yield takeEvery(ADD_FLOOR, addFloorItems);
}

/* Add Floor - ENDS */

/* Add Location - Start */

const addLocationRequest = async (
  name,
  unique_code,
  description,
  address,
  city,
  country,
  zip,
  state,
  image,
  start_time,
  end_time,
  time_zone,
  is_open
) => {
  return await axios({
    method: 'post',
    url: `https://hd-coworking.herokuapp.com/api/space/location/`,
    params: {
      name: name,
      unique_code: unique_code,
      description: description,
      address: address,
      city: city,
      country: country,
      zip: zip,
      state: state,
      image: image,
      start_time: start_time,
      end_time: end_time,
      time_zone: time_zone,
      is_open: is_open,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

function* addLocationItems({ payload }) {
  //console.log('floor',payload.state);
  const { name, unique_code, description, address, city, country, zip, state } =
    payload.location;
  const { image } = payload.image;
  const { start_time } = payload.start_time;
  const { end_time } = payload.end_time;
  const { time_zone } = payload.time_zone;
  const { is_open } = payload.is_open;

  try {
    const addLocation = yield call(
      addLocationRequest,
      name,
      unique_code,
      description,
      address,
      city,
      country,
      zip,
      state,
      image,
      start_time,
      end_time,
      time_zone,
      is_open
    );
    yield put(SpaceaddLocationSuccess(addLocation));
    //console.log('adres',addLocation);
  } catch (error) {
    console.log(error);
    yield put(SpaceaddLocationError(error));
  }
}

export function* watchaddLocation() {
  yield takeEvery(ADD_LOCATION, addLocationItems);
}

/* Add Location - Ends */

// --------- Desk ---------
// --------- Meeting Room ---------
// --------- Private Cabin ---------
// --------- Conference Room ---------

export default function* rootSaga() {
  yield all([
    fork(watchGetLocationList),
    fork(watchaddFloor),
    fork(watchaddLocation),
    fork(watchSingleSpace),
  ]);
}
