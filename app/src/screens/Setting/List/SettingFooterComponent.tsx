import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = () => {
  return <SafeAreaView edges={['bottom']} />
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as SettingFooterComponent }
