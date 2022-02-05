import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SettingParams } from './setting.params'
import { SettingName } from './setting.constraint'
import { Setting } from '@/screens/Setting'

const Stack = createNativeStackNavigator<SettingParams>()

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={SettingName.Setting}
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name={SettingName.Setting} component={Setting} />
    </Stack.Navigator>
  )
}

export { Routes as SettingRoutes }
