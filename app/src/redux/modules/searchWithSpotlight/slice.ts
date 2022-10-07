import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { PersistConfig, persistReducer } from 'redux-persist'

export type SearchWithSpotlightState = {
  isValidated: boolean
  updatedAt: number
}

const initialState: Readonly<SearchWithSpotlightState> = {
  isValidated: true,
  updatedAt: 0,
}

const config: PersistConfig<SearchWithSpotlightState> = {
  key: 'SEARCH_WITH_SPOTLIGHT',
  version: 1,
  storage: AsyncStorage,
}

const searchWithSpotlightSlice = createSlice({
  name: 'SEARCH_WITH_SPOTLIGHT',
  initialState,
  reducers: {
    assignIsValidatedSearchWithSpotlight(
      state,
      { payload }: PayloadAction<boolean>,
    ) {
      state.isValidated = payload
    },
    updatedSearchWithSpotlight(state) {
      state.updatedAt = dayjs().valueOf()
    },
  },
})

export const {
  assignIsValidatedSearchWithSpotlight,
  updatedSearchWithSpotlight,
} = searchWithSpotlightSlice.actions

export const searchWithSpotlightReducer = persistReducer(
  config,
  searchWithSpotlightSlice.reducer,
)
