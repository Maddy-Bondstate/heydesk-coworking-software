// eslint-disable-next-line import/no-cycle
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

// GET BOOKING
export const getClientBookingList = (token) => ({
  type: CLIENT_GET_BOOKING_LIST,
  token: token,
});

export const getClientBookingListSuccess = (items) => ({
  type: CLIENT_GET_BOOKING_LIST_SUCCESS,
  payload: items,
});

export const getClientBookingListError = (error) => ({
  type: CLIENT_GET_BOOKING_LIST_ERROR,
  payload: error,
});

// ADD BOOKING
export const addClientBooking = (data, token, method) => ({
  type: CLIENT_ADD_BOOKING,
  payload: data,
  token: token,
  method,
});

export const addClientBookingSuccess = (items) => ({
  type: CLIENT_ADD_BOOKING_SUCCESS,
  payload: items,
});

export const addClientBookingError = (error) => ({
  type: CLIENT_ADD_BOOKING_ERROR,
  payload: error,
});

// ----------------------- CUSTOMER ---------------------- //

// GET CUSTOMER
export const getClientCustomerList = (token) => ({
  type: CLIENT_GET_CUSTOMER_LIST,
  token: token,
});

export const getClientCustomerListSuccess = (items) => ({
  type: CLIENT_GET_CUSTOMER_LIST_SUCCESS,
  payload: items,
});

export const getClientCustomerListError = (error) => ({
  type: CLIENT_GET_CUSTOMER_LIST_ERROR,
  payload: error,
});

// ADD CUSTOMER
export const addClientCustomer = (data, token, method) => ({
  type: CLIENT_ADD_CUSTOMER,
  payload: data,
  token: token,
  method,
});

export const addClientCustomerSuccess = (items) => ({
  type: CLIENT_ADD_CUSTOMER_SUCCESS,
  payload: items,
});

export const addClientCustomerError = (error) => ({
  type: CLIENT_ADD_CUSTOMER_ERROR,
  payload: error,
});
