import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
  assignIsValidatedSearchWithSpotlight,
  updatedSearchWithSpotlight,
} from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(assignIsValidatedSearchWithSpotlight, (state, value) => ({
    ...state,
    isValidated: value,
  }))
  .case(updatedSearchWithSpotlight, (state) => ({
    ...state,
    updatedAt: dayjs().valueOf(),
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'ubepedia/searchWithSpotlight',
    blacklist: undefined,
    whitelist: ['isValidated', 'updatedAt'],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as searchWithSpotlightReducer }
