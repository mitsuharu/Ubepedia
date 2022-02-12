import { ToastState } from '@/redux/modules/toast/state'
import { UserSettingState } from './modules/userSetting/state'

export interface RootState {
  toast: ToastState
  userSetting: UserSettingState
}

// typescript definition
// see: https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
