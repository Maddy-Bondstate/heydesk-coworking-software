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

const INIT_STATE = {
  loading: true,
  location: null,
  addlocation: null,
  addLocationFloor: null,
  meeting: null,
  addMeeting: null,
  error: '',
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // --------------- LOCATION -------------- //
    // GET
    case SPACE_GET_LOCATION_LIST:
      return { ...state, loading: true };
    case SPACE_GET_LOCATION_LIST_SUCCESS:
      return { ...state, loading: false, location: action.payload };
    case SPACE_GET_LOCATION_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    // ADD
    case SPACE_ADD_LOCATION:
      return { ...state, loading: true };
    case SPACE_ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        addlocation: action.payload,
      };
    case SPACE_ADD_LOCATION_ERROR:
      return { ...state, loading: false, error: action.payload };

    // --------------- FLOOR -------------- //
    // ADD
    case SPACE_ADD_LOCATION_FLOOR:
      return { ...state, loading: true };
    case SPACE_ADD_LOCATION_FLOOR_SUCCESS:
      return {
        ...state,
        loading: false,
        addLocationFloor: action.payload,
      };
    case SPACE_ADD_LOCATION_FLOOR_ERROR:
      return { ...state, loading: false, error: action.payload };

    // --------------- MEETING ROOM -------------- //
    // GET
    case SPACE_GET_MEETING_LIST:
      return { ...state, loading: true };
    case SPACE_GET_MEETING_LIST_SUCCESS:
      return { ...state, loading: false, meeting: action.payload };
    case SPACE_GET_MEETING_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    // ADD
    case SPACE_ADD_MEETING:
      return { ...state, loading: true };
    case SPACE_ADD_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        addMeeting: action.payload,
      };
    case SPACE_ADD_MEETING_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
