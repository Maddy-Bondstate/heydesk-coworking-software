// eslint-disable-next-line import/no-cycle
import {
  SPACE_GET_LOCATION_LIST,
  SPACE_GET_LOCATION_LIST_SUCCESS,
  SPACE_GET_LOCATION_LIST_ERROR,
  SPACE_ADD_LOCATION,
  SPACE_ADD_LOCATION_SUCCESS,
  SPACE_ADD_LOCATION_ERROR,
  SPACE_ADD_LOCATION_FLOOR,
  SPACE_ADD_LOCATION_FLOOR_SUCCESS,
  SPACE_ADD_LOCATION_FLOOR_ERROR,
} from '../actions';

// Get Location
export const getSpaceLocationList = () => ({
  type: SPACE_GET_LOCATION_LIST,
});

export const getSpaceLocationListSuccess = (items) => ({
  type: SPACE_GET_LOCATION_LIST_SUCCESS,
  payload: items,
});

export const getSpaceLocationListError = (error) => ({
  type: SPACE_GET_LOCATION_LIST_ERROR,
  payload: error,
});

// Location
export const addSpaceLocation = (data, method) => ({
  type: SPACE_ADD_LOCATION,
  payload: data,
  method,
});

export const addSpaceLocationSuccess = (items) => ({
  type: SPACE_ADD_LOCATION_SUCCESS,
  payload: items,
});

export const addSpaceLocationError = (error) => ({
  type: SPACE_ADD_LOCATION_ERROR,
  payload: error,
});

// Floor
export const addSpaceLocationFloor = (data, method) => ({
  type: SPACE_ADD_LOCATION_FLOOR,
  payload: data,
  method,
});

export const addSpaceLocationFloorSuccess = (items) => ({
  type: SPACE_ADD_LOCATION_FLOOR_SUCCESS,
  payload: items,
});

export const addSpaceLocationFloorError = (error) => ({
  type: SPACE_ADD_LOCATION_FLOOR_ERROR,
  payload: error,
});
