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
      initialRouteName={RootName.Main}
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name={RootName.Main} component={MainRoutes} />
      <Stack.Screen
        name={RootName.Setting}
        component={SettingRoutes}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

export { Routes as RootRoutes }
