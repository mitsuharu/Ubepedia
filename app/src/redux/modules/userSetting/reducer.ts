import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
  assignCanCopyToClipboardOnLongPress,
  assignMainType,
  toggleCanCopyToClipboardOnLongPress,
} from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(assignMainType, (state, value) => ({
    ...state,
    mainType: value,
  }))
  .case(assignCanCopyToClipboardOnLongPress, (state, value) => ({
    ...state,
    canCopyToClipboardOnLongPress: value,
  }))
  .case(toggleCanCopyToClipboardOnLongPress, (state) => ({
    ...state,
    canCopyToClipboardOnLongPress: !state.canCopyToClipboardOnLongPress,
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'ubepedia/userSetting',
    blacklist: undefined,
    whitelist: ['mainType', 'assignOnLongPressCopyToClipboard'],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as userSettingReducer }
