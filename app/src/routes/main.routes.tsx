import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainParams } from './main.params'
import { Home } from '@/screens/Home'
import { Detail } from '@/screens/Detail'
import { MainName } from './main.constraint'
import { Search } from '@/screens/Search'
import { Map } from '@/screens/Map'

const Stack = createNativeStackNavigator<MainParams>()

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainName.Home}
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name={MainName.Home} component={Home} />
      <Stack.Screen name={MainName.Detail} component={Detail} />
      <Stack.Screen name={MainName.Search} component={Search} />
      <Stack.Screen name={MainName.Map} component={Map} />
    </Stack.Navigator>
  )
}

export { Routes as MainRoutes }
