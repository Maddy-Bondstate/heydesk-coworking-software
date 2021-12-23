import {
  CHANGE_LOCALE,
  SETTINGS_GET_PROFILE_LIST,
  SETTINGS_GET_PROFILE_LIST_SUCCESS,
  SETTINGS_GET_PROFILE_LIST_ERROR,
  SETTINGS_ADD_PROFILE,
  SETTINGS_ADD_PROFILE_SUCCESS,
  SETTINGS_ADD_PROFILE_ERROR,
} from '../actions';
import { getCurrentLanguage } from '../../helpers/Utils';

const INIT_STATE = {
  locale: getCurrentLanguage(),
  profile: null,
  addProfile: false,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };

    // GET PROFILE
    case SETTINGS_GET_PROFILE_LIST:
      return { ...state, loading: true };
    case SETTINGS_GET_PROFILE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case SETTINGS_GET_PROFILE_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    // ADD PROFILE
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
