import { Store } from 'redux'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { RootState } from '@/redux/RootState'
import { rootSaga } from '@/redux/saga'
import { Persistor } from 'redux-persist/es/types'
import { snackbarReducer, searchWithSpotlightReducer } from './internal'
import { reducer as networkReducer } from 'react-native-offline'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSettingReducer } from './modules/userSetting/slice'
import AsyncStorage from '@react-native-async-storage/async-storage'

let store: Store
let persistor: Persistor

export function initializeRedux() {
  console.log(`initializeRedux store: ${!!store}, persistor: ${!!persistor}`)

  if (store == null || persistor == null) {
    const config: PersistConfig<RootState> = {
      key: 'root',
      version: 1,
      storage: AsyncStorage,
      whitelist: ['userSetting'],
      blacklist: [],
    }

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
      reducer: persistReducer(config, reducer),
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
