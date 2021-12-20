import {
  DASHBOARD_GET_CALENDAR_LIST,
  DASHBOARD_GET_CALENDAR_LIST_SUCCESS,
  DASHBOARD_GET_CALENDAR_LIST_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: true,
  calendar: null,
  error: '',
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get Calendar
    case DASHBOARD_GET_CALENDAR_LIST:
      return { ...state, loading: true };

    case DASHBOARD_GET_CALENDAR_LIST_SUCCESS:
      return { ...state, loading: false, calendar: action.payload };

    case DASHBOARD_GET_CALENDAR_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
