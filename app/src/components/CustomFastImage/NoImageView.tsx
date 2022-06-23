import { COLOR } from '@/CONSTANTS/COLOR'
import { styleType } from '@/utils/styles'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { makeStyles } from 'react-native-swag-styles'
import Icon from 'react-native-vector-icons/Entypo'
import { Spacer } from '@/components/Spacer'

type Props = {
  isVisible: boolean
  style?: StyleProp<ViewStyle>
}

export const NoImageView: React.FC<Props> = ({ style, isVisible }) => {
  const styles = useStyles()
  return isVisible ? (
    <View style={[styles.container, style]}>
      <Text>sad</Text>
      {/* <Icon style={styles.icon} name="emoji-sad" size={30} color="gray" /> */}
      <Spacer height={4} />
      <Text style={styles.text}>画像の読込に失敗しました</Text>
    </View>
  ) : null
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR(colorScheme).TEXT.SECONDARY,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 4,
  }),
  icon: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
  text: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
}))
