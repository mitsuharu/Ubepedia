import React from 'react'
import Toast from 'react-native-toast-message'

/**
 * アプリで使用する Toast
 *
 * @description
 * 表示制御は saga で行われる。
 *
 * @description
 * 今回は react-native-toast-message を使用した。他に良いのがあれば置き換える
 */
export const GlobalToast: React.FC = () => {
  return <Toast />
}
