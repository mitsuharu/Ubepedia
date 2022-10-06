import { combineReducers, Store } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { RootState } from '@/redux/RootState'
import { rootSaga } from '@/redux/saga'
import { Persistor } from 'redux-persist/es/types'
import {
  snackbarReducer,
  userSettingReducer,
  searchWithSpotlightReducer,
} from './internal'
import { reducer as networkReducer } from 'react-native-offline'
import { configureStore } from '@reduxjs/toolkit'

let store: Store
let persistor: Persistor

export function initializeRedux() {
  console.log(`initializeRedux store: ${!!store}, persistor: ${!!persistor}`)

  if (store == null || persistor == null) {
    const reducer = combineReducers<RootState>({
      snackbar: snackbarReducer,
      userSetting: userSettingReducer,
      searchWithSpotlight: searchWithSpotlightReducer,
      network: networkReducer,
    })

    const sagaMiddleware = createSagaMiddleware({
      onError: (error: Error, errorInfo: any) => {
        console.error('sagaMiddleware', error, errorInfo)
      },
    })

    store = configureStore({
      reducer: reducer,
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        sagaMiddleware,
      ],
      devTools: false,
    })

    persistor = persistStore(store, null, () => {
      console.log('initializeRedux sagaMiddleware will run')
      sagaMiddleware.run(rootSaga)
      console.log('initializeRedux sagaMiddleware is awaked')
    })
  }
  console.log(`initializeRedux store: ${!!store}, persistor: ${!!persistor}`)

  return { store, persistor }
}
