import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import dashboardSagas from './dashboard/saga';
import spaceSagas from './space/saga';

export default function* rootSaga() {
  yield all([authSagas(), dashboardSagas(), spaceSagas()]);
}
