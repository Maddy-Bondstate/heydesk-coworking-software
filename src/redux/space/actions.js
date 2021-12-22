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
  SPACE_GET_MEETING_LIST,
  SPACE_GET_MEETING_LIST_SUCCESS,
  SPACE_GET_MEETING_LIST_ERROR,
  SPACE_ADD_MEETING,
  SPACE_ADD_MEETING_SUCCESS,
  SPACE_ADD_MEETING_ERROR,
} from '../actions';

// ------------- LOCATION ------------- //
// GET
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

// ADD
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

// ------------- FLOOR ------------- //
// ADD
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

// ------------- MEETING ROOM ------------- //
// GET
export const getSpaceMeetingList = (data) => ({
  type: SPACE_GET_MEETING_LIST,
  payload: data,
});

export const getSpaceMeetingListSuccess = (items) => ({
  type: SPACE_GET_MEETING_LIST_SUCCESS,
  payload: items,
});

export const getSpaceMeetingListError = (error) => ({
  type: SPACE_GET_MEETING_LIST_ERROR,
  payload: error,
});

// ADD
export const addSpaceMeeting = (data, method) => ({
  type: SPACE_ADD_MEETING,
  payload: data,
  method,
});

export const addSpaceMeetingSuccess = (items) => ({
  type: SPACE_ADD_MEETING_SUCCESS,
  payload: items,
});

export const addSpaceMeetingError = (error) => ({
  type: SPACE_ADD_MEETING_ERROR,
  payload: error,
});
