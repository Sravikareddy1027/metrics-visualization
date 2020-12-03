import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import dashboardSaga from '../Features/dashboard/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(dashboardSaga);
}
