import {
  CLIENT_GET_BOOKING_LIST,
  CLIENT_GET_BOOKING_LIST_SUCCESS,
  CLIENT_GET_BOOKING_LIST_ERROR,
  CLIENT_ADD_BOOKING,
  CLIENT_ADD_BOOKING_SUCCESS,
  CLIENT_ADD_BOOKING_ERROR,
  CLIENT_GET_CUSTOMER_LIST,
  CLIENT_GET_CUSTOMER_LIST_SUCCESS,
  CLIENT_GET_CUSTOMER_LIST_ERROR,
  CLIENT_ADD_CUSTOMER,
  CLIENT_ADD_CUSTOMER_SUCCESS,
  CLIENT_ADD_CUSTOMER_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: true,
  booking: null,
  addBooking: null,
  customer: null,
  addCustomer: null,
  error: '',
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // -------------------- BOOKING ----------------- //

    // Get Booking
    case CLIENT_GET_BOOKING_LIST:
      return { ...state, loading: true };
    case CLIENT_GET_BOOKING_LIST_SUCCESS:
      return { ...state, loading: false, booking: action.payload };
    case CLIENT_GET_BOOKING_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    // Add Booking
    case CLIENT_ADD_BOOKING:
      return { ...state, loading: true };
    case CLIENT_ADD_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        addBooking: action.payload,
      };
    case CLIENT_ADD_BOOKING_ERROR:
      return { ...state, loading: false, error: action.payload };

    // -------------------- CUSTOMER ----------------- //

    // Get Customer
    case CLIENT_GET_CUSTOMER_LIST:
      return { ...state, loading: true };
    case CLIENT_GET_CUSTOMER_LIST_SUCCESS:
      return { ...state, loading: false, customer: action.payload };
    case CLIENT_GET_CUSTOMER_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    // Add Customer
    case CLIENT_ADD_CUSTOMER:
      return { ...state, loading: true };
    case CLIENT_ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        addCustomer: action.payload,
      };
    case CLIENT_ADD_CUSTOMER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
