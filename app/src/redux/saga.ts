import { all, fork } from 'redux-saga/effects'
import { toastSaga } from './internal'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([fork(toastSaga)])
}
