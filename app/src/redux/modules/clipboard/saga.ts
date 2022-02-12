import { put, takeEvery } from 'redux-saga/effects'
import { copyToClipboard } from './actions'
import Clipboard from '@react-native-clipboard/clipboard'
import { enqueueToast } from '@/redux/modules/toast/actions'

export function* clipboardSaga() {
  yield takeEvery(copyToClipboard, copyToClipboardSaga)
}

function* copyToClipboardSaga({
  payload: { text, showResult },
}: ReturnType<typeof copyToClipboard>) {
  try {
    Clipboard.setString(text)
    if (showResult) {
      yield put(
        enqueueToast({ message: `${text} をクリップボードにコピーしました` }),
      )
    }
  } catch (e: any) {
    console.warn('copyToClipboardSaga', e)
    if (showResult) {
      yield put(
        enqueueToast({
          message: `${text} のクリップボードへのコピーを失敗しました`,
        }),
      )
    }
  }
}
