import {
  SPACE_GET_LOCATION_LIST,
  SPACE_GET_LOCATION_LIST_SUCCESS,
  SPACE_GET_LOCATION_LIST_ERROR,
  SPACE_ADD_LOCATION,
  SPACE_ADD_LOCATION_SUCCESS,
  SPACE_ADD_LOCATION_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: true,
  location: null,
  addlocation: false,
  error: '',
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get Location Space
    case SPACE_GET_LOCATION_LIST:
      return { ...state, loading: true };

    case SPACE_GET_LOCATION_LIST_SUCCESS:
      return { ...state, loading: false, location: action.payload };

    case SPACE_GET_LOCATION_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    // Add Location Space
    case SPACE_ADD_LOCATION:
      return { ...state, loading: true };

    case SPACE_ADD_LOCATION_SUCCESS:
      return { ...state, loading: false, addlocation: action.payload };

    case SPACE_ADD_LOCATION_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
