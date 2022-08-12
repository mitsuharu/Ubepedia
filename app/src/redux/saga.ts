import { all, fork } from 'redux-saga/effects'
import {
  clipboardSaga,
  inAppBrowserSaga,
  searchWithSpotlightSaga,
} from './internal'
import { networkSaga } from 'react-native-offline'
import { ConnectivityArgs } from 'react-native-offline/dist/src/types'

export function* rootSaga() {
  console.log('rootSaga start')
  yield all([
    fork(clipboardSaga),
    fork(inAppBrowserSaga),
    fork(searchWithSpotlightSaga),
    fork(networkSaga, {
      pingInterval: 30 * 1000,
    } as ConnectivityArgs),
  ])
}
