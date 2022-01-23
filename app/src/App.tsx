import React from 'react'
import { PersistGate as PersistProvider } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux'
import { initializeRedux } from '@/redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Routes from './routes'
import { GlobalToast } from '@/components/GlobalToast'

const App = () => {
  const { persistor, store } = initializeRedux()

  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistProvider loading={null} persistor={persistor}>
          <Routes />
          <GlobalToast />
        </PersistProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}

export default App
