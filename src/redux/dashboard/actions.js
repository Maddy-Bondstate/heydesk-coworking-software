// eslint-disable-next-line import/no-cycle
import {
  DASHBOARD_GET_CALENDAR_LIST,
  DASHBOARD_GET_CALENDAR_LIST_SUCCESS,
  DASHBOARD_GET_CALENDAR_LIST_ERROR,
} from '../actions';

export const getDashboardCalendarList = (data, token) => ({
  type: DASHBOARD_GET_CALENDAR_LIST,
  payload: data,
  token,
});

export const getDashboardCalendarListSuccess = (items) => ({
  type: DASHBOARD_GET_CALENDAR_LIST_SUCCESS,
  payload: items,
});

export const getDashboardCalendarListError = (error) => ({
  type: DASHBOARD_GET_CALENDAR_LIST_ERROR,
  payload: error,
});
