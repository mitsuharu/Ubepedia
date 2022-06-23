import React, { useCallback } from 'react'
import { Button } from './index'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { makeStyles } from 'react-native-swag-styles'
import { Text, TextStyle, useColorScheme } from 'react-native'
import { styleType } from '@/utils/styles'
import { COLOR } from '@/CONSTANTS/COLOR'

export const CloseButton = () => {
  const styles = useStyles()
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Button onPress={onPress}>
      <Text>close</Text>
      {/* <Icon name="close" size={20} style={styles.icon} /> */}
    </Button>
  )
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  icon: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
}))
