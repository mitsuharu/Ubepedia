import { all, fork } from 'redux-saga/effects'
import { networkSaga } from 'react-native-offline'
import { ConnectivityArgs } from 'react-native-offline/dist/src/types'
import { searchWithSpotlightSaga } from './modules/searchWithSpotlight/saga'
import { clipboardSaga } from './modules/clipboard/saga'
import { inAppBrowserSaga } from './modules/inAppWebBrowser/saga'

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
