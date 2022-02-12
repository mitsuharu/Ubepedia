import { call, put, takeEvery } from 'redux-saga/effects'
import { openWeb } from './actions'
import * as WebBrowser from 'expo-web-browser'
import { enqueueToast } from '@/redux/modules/toast/actions'

export function* inAppBrowserSaga() {
  yield takeEvery(openWeb, openWebSaga)
}

function* openWebSaga({ payload }: ReturnType<typeof openWeb>) {
  try {
    yield call(WebBrowser.openBrowserAsync, payload)
  } catch (e: any) {
    console.warn('openWebSaga', e)
    yield put(
      enqueueToast({
        message: `web browser を開くのを失敗しまた`,
      }),
    )
  }
}
