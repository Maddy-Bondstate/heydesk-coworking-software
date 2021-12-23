// eslint-disable-next-line import/no-cycle
import {
  CHANGE_LOCALE,
  SETTINGS_GET_PROFILE_LIST,
  SETTINGS_GET_PROFILE_LIST_SUCCESS,
  SETTINGS_GET_PROFILE_LIST_ERROR,
  SETTINGS_ADD_PROFILE,
  SETTINGS_ADD_PROFILE_SUCCESS,
  SETTINGS_ADD_PROFILE_ERROR,
} from '../actions';
import { setCurrentLanguage } from '../../helpers/Utils';

// eslint-disable-next-line import/prefer-default-export
export const changeLocale = (locale) => {
  setCurrentLanguage(locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};

// GET PROFILE
export const getSettingsProfileList = () => ({
  type: SETTINGS_GET_PROFILE_LIST,
});

export const getSettingsProfileListSuccess = (items) => ({
  type: SETTINGS_GET_PROFILE_LIST_SUCCESS,
  payload: items,
});

export const getSettingsProfileListError = (error) => ({
  type: SETTINGS_GET_PROFILE_LIST_ERROR,
  payload: error,
});

// ADD PROFILE
export const addSettingsProfile = (data) => ({
  type: SETTINGS_ADD_PROFILE,
  payload: data,
});

export const addSettingsProfileSuccess = (items) => ({
  type: SETTINGS_ADD_PROFILE_SUCCESS,
  payload: items,
});

export const addSettingsProfileError = (error) => ({
  type: SETTINGS_ADD_PROFILE_ERROR,
  payload: error,
});
