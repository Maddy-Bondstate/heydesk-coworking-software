import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import dashboard from './dashboard/reducer';
import space from './space/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  space,
  dashboard,
});

export default reducers;
