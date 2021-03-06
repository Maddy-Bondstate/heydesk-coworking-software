// eslint-disable-next-line import/no-cycle
import {
  SPACE_GET_LOCATION_LIST,
  SPACE_GET_LOCATION_LIST_SUCCESS,
  SPACE_GET_LOCATION_LIST_ERROR,

  ADD_FLOOR,
  ADD_FLOOR_SUCCESS,
  ADD_FLOOR_ERROR,

  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,

  SINGLE_SPACE,
  SINGLE_SPACE_SUCCESS,
  SINGLE_SPACE_ERROR,

  SINGLE_FLOOR,
  SINGLE_FLOOR_SUCCESS,
  SINGLE_FLOOR_ERROR,

  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_ERROR,


} from '../actions';

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

/* Add floor - Starts */

export const SpaceaddFloor = (company,state,image,isOpen) => ({
  type : ADD_FLOOR,
  payload: { company,state,image,isOpen },
});

export const SpaceaddFloorSuccess = (item) => ({
  type : ADD_FLOOR_SUCCESS,
  payload : item
});

export const SpaceaddFloorError = (error) => ({
  type : ADD_FLOOR_ERROR,
  payload : error
});

/* Add floor - Ends */

/* Add location - Starts */

export const SpaceaddLocation = (location,image,start_time,end_time,time_zone,is_open) => ({
  type : ADD_LOCATION,
  payload : { location,image,start_time,end_time,time_zone,is_open }
});

export const SpaceaddLocationSuccess = (item) => ({
  type : ADD_LOCATION_SUCCESS,
  payload : item,
});

export const SpaceaddLocationError = (error) => ({
  type : ADD_LOCATION_ERROR,
  payload : error,
});
/* Add location - Ends */

/* Update Location - starts */
export const SpaceupdateLocation = (space_id,location,image,start_time,end_time,time_zone,is_open) => ({
  type : UPDATE_LOCATION,
  payload : { space_id,location,image,start_time,end_time,time_zone,is_open }
});

export const SpaceupdateLocationSuccess = (item) => ({
  type : UPDATE_LOCATION_SUCCESS,
  payload : item,
});

export const SpaceupdateLocationError = (error) => ({
  type : UPDATE_LOCATION_ERROR,
  payload : error,
});

/* Update Location - Ends */

/* SINGLE SPACE DETAILS - STARTS */

export const SingleSpace = (space_id) => ({
  type : SINGLE_SPACE,
  payload : { space_id }
});

export const SingleSpaceSuccess = (item) => ({
  type : SINGLE_SPACE_SUCCESS,
  payload : item
});

export const SingleSpaceError = (error) => ({
  type : SINGLE_SPACE_ERROR,
  payload : error
});

/* SINGLE SPACE DETAILS - END */

/* SINGLE FLOOR - STARTS */

export const LocSingleFloor = (space_id) => ({
  type : SINGLE_FLOOR,
  payload : { space_id }
});

export const LocSingleFloorSuccess = (item) => ({
  type : SINGLE_FLOOR_SUCCESS,
  payload : item
});

export const LocSingleFloorError = (error) => ({
  type : SINGLE_FLOOR_ERROR,
  payload : error
});

/* SINGLE FLOOR - ENDS */
