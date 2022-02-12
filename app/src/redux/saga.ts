import { all, fork } from 'redux-saga/effects'
import { clipboardSaga, inAppBrowserSaga, toastSaga } from './internal'
import { networkSaga } from 'react-native-offline'
import { ConnectivityArgs } from 'react-native-offline/dist/src/types'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([
    fork(toastSaga),
    fork(clipboardSaga),
    fork(inAppBrowserSaga),
    fork(networkSaga, {
      pingInterval: 30 * 1000,
    } as ConnectivityArgs),
  ])
}
