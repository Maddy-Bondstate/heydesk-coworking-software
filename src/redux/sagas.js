import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import dashboardSagas from './dashboard/saga';
import spaceSagas from './space/saga';
import clientSagas from './client/saga';
import settingsSagas from './settings/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    dashboardSagas(),
    spaceSagas(),
    clientSagas(),
    settingsSagas(),
  ]);
}
