import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SettingRoutes } from './setting.routes'
import { MainRoutes } from './main.routes'
import { RootParams } from './root.params'
import { RootName } from './root.constraint'

const Stack = createNativeStackNavigator<RootParams>()

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RootName.MainRoute}
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name={RootName.MainRoute} component={MainRoutes} />
      <Stack.Screen
        name={RootName.SettingRoute}
        component={SettingRoutes}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

export { Routes as RootRoutes }
