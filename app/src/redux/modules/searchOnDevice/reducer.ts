import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
  assignIsValidatedSearchOnDevice,
  updatedSearchOnDevice,
} from './actions'
import { initialState } from './state'

const baseReducer = reducerWithInitialState(initialState)
  .case(assignIsValidatedSearchOnDevice, (state, value) => ({
    ...state,
    isValidated: value,
  }))
  .case(updatedSearchOnDevice, (state) => ({
    ...state,
    updatedAt: dayjs().valueOf(),
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'ubepedia/searchOnDevice',
    blacklist: undefined,
    whitelist: ['isValidated', 'updatedAt'],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as searchOnDeviceReducer }
