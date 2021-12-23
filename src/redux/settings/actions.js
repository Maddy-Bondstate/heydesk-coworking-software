// eslint-disable-next-line import/no-cycle
import {
  CHANGE_LOCALE,
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

// ADD PROFILE
export const addSettingsProfile = (data, method) => ({
  type: SETTINGS_ADD_PROFILE,
  payload: data,
  method,
});

export const addSettingsProfileSuccess = (items) => ({
  type: SETTINGS_ADD_PROFILE_SUCCESS,
  payload: items,
});

export const addSettingsProfileError = (error) => ({
  type: SETTINGS_ADD_PROFILE_ERROR,
  payload: error,
});
