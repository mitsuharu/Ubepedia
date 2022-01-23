import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { enqueueToast, dequeueToast, clearToast } from './actions'
import { initialState } from './state'
import dayjs from 'dayjs'

const baseReducer = reducerWithInitialState(initialState)
  .case(enqueueToast, (state, { message, type }) => ({
    ...state,
    itemQueue: [
      ...state.itemQueue,
      {
        message: message,
        createdAt: dayjs().valueOf(),
        type: type ?? 'info',
      },
    ],
  }))
  .case(dequeueToast, (state, { createdAt }) => ({
    ...state,
    itemQueue: state.itemQueue.filter((item) => item.createdAt !== createdAt),
  }))
  .case(clearToast, (state) => ({
    ...state,
    itemQueue: [],
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'hogehoge/toast',
    blacklist: undefined,
    whitelist: [],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as toastReducer }
