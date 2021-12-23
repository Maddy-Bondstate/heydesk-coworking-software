import {
  CHANGE_LOCALE,
  SETTINGS_ADD_PROFILE,
  SETTINGS_ADD_PROFILE_SUCCESS,
  SETTINGS_ADD_PROFILE_ERROR,
} from '../actions';
import { getCurrentLanguage } from '../../helpers/Utils';

const INIT_STATE = {
  locale: getCurrentLanguage(),
  addProfile: false,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };

    // Add PROFILE
    case SETTINGS_ADD_PROFILE:
      return { ...state, loading: true };
    case SETTINGS_ADD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        addProfile: action.payload,
      };
    case SETTINGS_ADD_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
