import { all, fork } from 'redux-saga/effects'
import { clipboardSaga, inAppBrowserSaga, toastSaga } from './internal'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([fork(toastSaga), fork(clipboardSaga), fork(inAppBrowserSaga)])
}
