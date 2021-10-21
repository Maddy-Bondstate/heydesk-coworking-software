import {
  SPACE_GET_LOCATION_LIST,
  SPACE_GET_LOCATION_LIST_SUCCESS,
  SPACE_GET_LOCATION_LIST_ERROR,
} from '../actions';

const INIT_STATE = {
  location: null,
  loading: true,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SPACE_GET_LOCATION_LIST:
      return { ...state, loading: true };

    case SPACE_GET_LOCATION_LIST_SUCCESS:
      return { ...state, loading: false, location: action.payload };

    case SPACE_GET_LOCATION_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
