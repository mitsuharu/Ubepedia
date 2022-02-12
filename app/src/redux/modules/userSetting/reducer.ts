import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
  assignOnLongPressCopyToClipboard,
  toggleOnLongPressCopyToClipboard,
} from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(assignOnLongPressCopyToClipboard, (state, value) => ({
    ...state,
    onLongPressCopyToClipboard: value,
  }))
  .case(toggleOnLongPressCopyToClipboard, (state) => ({
    ...state,
    onLongPressCopyToClipboard: !state.onLongPressCopyToClipboard,
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
