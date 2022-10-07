import { put, takeEvery } from 'redux-saga/effects'
import { copyToClipboard } from './slice'
import Clipboard from '@react-native-clipboard/clipboard'
import { enqueueSnackbar } from '@/redux/modules/snackbar/slice'

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
        enqueueSnackbar({
          message: `${text} をクリップボードにコピーしました`,
        }),
      )
    }
  } catch (e: any) {
    console.warn('copyToClipboardSaga', e)
    if (showResult) {
      yield put(
        enqueueSnackbar({
          message: `${text} のクリップボードへのコピーを失敗しました`,
        }),
      )
    }
  }
}
