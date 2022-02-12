import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
  assignCanCopyToClipboardOnLongPress,
  toggleCanCopyToClipboardOnLongPress,
} from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(assignCanCopyToClipboardOnLongPress, (state, value) => ({
    ...state,
    canCopyToClipboardOnLongPress: value,
  }))
  .case(toggleCanCopyToClipboardOnLongPress, (state) => ({
    ...state,
    onLongPressCopyToClipboard: !state.canCopyToClipboardOnLongPress,
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'hogehoge/userSetting',
    blacklist: undefined,
    whitelist: ['assignOnLongPressCopyToClipboard'],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as userSettingReducer }
