import { CHANGE_LOCALE } from '../actions';
import { getCurrentLanguage } from '../../helpers/Utils';

const INIT_STATE = {
  locale: getCurrentLanguage(),
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
