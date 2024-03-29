import { Store } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { RootState } from '@/redux/RootState'
import { rootSaga } from '@/redux/saga'
import { Persistor } from 'redux-persist/es/types'
import { reducer as networkReducer } from 'react-native-offline'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSettingReducer } from './modules/userSetting/slice'
import { searchWithSpotlightReducer } from './modules/searchWithSpotlight/slice'
import { snackbarReducer } from './modules/snackbar/slice'

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

    /*
     * Redux-Toolkitで「A non-serializable value was detected」エラーが出たときの対処方法
     * https://zenn.dev/luvmini511/articles/91a76a34909555
     */
    store = configureStore({
      reducer: reducer,
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          serializableCheck: { ignoredActions: ['persist/PERSIST'] },
        }),
        sagaMiddleware,
      ],
      devTools: true,
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
