import { COLOR } from '@/CONSTANTS/COLOR'
import { styleType } from '@/utils/styles'
import React from 'react'
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { makeStyles } from 'react-native-swag-styles'

type Props = {
  isVisible: boolean
  style?: StyleProp<ViewStyle>
}

export const LoadingView: React.FC<Props> = ({ style, isVisible }) => {
  const styles = useStyles()
  return isVisible ? (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={styles.activityIndicator.color} />
    </View>
  ) : null
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  }),
  activityIndicator: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
}))
