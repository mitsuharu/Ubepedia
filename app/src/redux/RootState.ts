import { ToastState } from '@/redux/modules/toast/state'
import { UserSettingState } from './modules/userSetting/state'
import { reducer as networkReducer } from 'react-native-offline'

export interface RootState {
  toast: ToastState
  userSetting: UserSettingState

  // react-native-offline
  network: ReturnType<typeof networkReducer>
}

// typescript definition
// see: https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
