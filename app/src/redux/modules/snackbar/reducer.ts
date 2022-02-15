import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { enqueueSnackbar, dequeueSnackbar, clearSnackbar } from './actions'
import { initialState } from './state'
import dayjs from 'dayjs'

const baseReducer = reducerWithInitialState(initialState)
  .case(enqueueSnackbar, (state, { message, type }) => ({
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
  .case(dequeueSnackbar, (state, { createdAt }) => ({
    ...state,
    itemQueue: state.itemQueue.filter((item) => item.createdAt !== createdAt),
  }))
  .case(clearSnackbar, (state) => ({
    ...state,
    itemQueue: [],
  }))
  .build()

const reducer = persistReducer(
  {
    key: 'ubepedia/toast',
    blacklist: undefined,
    whitelist: [],
    storage: AsyncStorage,
  },
  baseReducer,
)

export { reducer as snackbarReducer }
