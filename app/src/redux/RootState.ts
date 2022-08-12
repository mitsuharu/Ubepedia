import { UserSettingState } from './modules/userSetting/state'
import { reducer as networkReducer } from 'react-native-offline'
import { SnackbarState } from './modules/snackbar/state'
import { SearchWithSpotlightState } from './modules/searchWithSpotlight/state'

export interface RootState {
  snackbar: SnackbarState
  userSetting: UserSettingState
  searchWithSpotlight: SearchWithSpotlightState

  // react-native-offline
  network: ReturnType<typeof networkReducer>
}

// typescript definition
// see: https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
