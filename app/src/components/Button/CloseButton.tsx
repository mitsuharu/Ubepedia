import React, { useCallback } from 'react'
import { Button } from './index'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

export const CloseButton = () => {
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Button onPress={onPress}>
      <Icon name="close" size={20} />
    </Button>
  )
}
