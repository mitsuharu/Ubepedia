import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useColorScheme } from 'react-native'
import { MainParams } from './main.params'
import { MainRoutes } from './main.routes'
import { NavigationTheme } from './theme'

/**
 * @see https://reactnavigation.org/docs/auth-flow/
 */
const Routes: React.FC = () => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer theme={NavigationTheme(colorScheme)}>
      <MainRoutes />
    </NavigationContainer>
  )
}

export default Routes

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends MainParams {}
  }
}
