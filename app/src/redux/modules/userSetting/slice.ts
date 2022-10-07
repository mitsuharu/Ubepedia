import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PersistConfig, persistReducer } from 'redux-persist'

export type MainType = 'list' | 'map'

export type UserSettingState = {
  /**
   * Main画面の表示タイプ
   */
  mainType: MainType

  /**
   * 長押しでテキストのコピーを行う
   */
  canCopyToClipboardOnLongPress: boolean
}

const config: PersistConfig<UserSettingState> = {
  key: 'USER_SETTING',
  version: 1,
  storage: AsyncStorage,
}

const initialState: UserSettingState = {
  mainType: 'list',
  canCopyToClipboardOnLongPress: false,
}

const userSettingSlice = createSlice({
  name: 'USER_SETTING',
  initialState,
  reducers: {
    assignMainType(state, action: PayloadAction<MainType>) {
      state.mainType = action.payload
    },
    assignCanCopyToClipboardOnLongPress(state, action: PayloadAction<boolean>) {
      state.canCopyToClipboardOnLongPress = action.payload
    },
    toggleCanCopyToClipboardOnLongPress(state) {
      state.canCopyToClipboardOnLongPress = !state.canCopyToClipboardOnLongPress
    },
  },
})

export const {
  assignMainType,
  assignCanCopyToClipboardOnLongPress,
  toggleCanCopyToClipboardOnLongPress,
} = userSettingSlice.actions

export const userSettingReducer = persistReducer(
  config,
  userSettingSlice.reducer,
)
