import React, { ReactNode, useMemo } from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { Button } from '@/components/Button'
import { contentInset } from '@/components/List/util'
import { COLOR } from '@/CONSTANTS/COLOR'
import Icon from 'react-native-vector-icons/AntDesign'
import { Size } from '@/utils/types'
import { match } from 'ts-pattern'
import { makeStyles } from 'react-native-swag-styles'
import { styleType } from '@/utils/styles'

const AccessorySize: Size = { width: 20, height: 20 }
type AccessoryType = undefined | 'disclosure'

type ContentProps = { title?: string; children?: ReactNode }

export type Props = ContentProps & {
  subtitle?: string
  description?: string
  onPress?: () => void

  /**
   * titleとsubtitleを横に並べるならtrue。デフォルトはfalse。
   */
  isRowDirection?: boolean

  /**
   * 右端に表示するアイコン。
   * - 'disclosure' の場合、「>」
   */
  accessory?: AccessoryType

  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  subtitleStyle?: StyleProp<TextStyle>
}

const Component: React.FC<Props> = ({
  title,
  children,
  subtitle,
  description,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  isRowDirection,
  accessory,
}) => {
  const styles = useStyles()

  const accessoryView = useMemo(
    () =>
      match(accessory)
        .with('disclosure', () => <Icon style={style} name="right" size={16} />)
        .otherwise(() => null),
    [accessory, style],
  )

  return (
    <Button style={[styles.container, style]} onPress={onPress}>
      {!!children && children}
      <View style={styles.row}>
        {!!title && (
          <View style={isRowDirection ? styles.innerRow : styles.innerColumn}>
            {!!subtitle && (
              <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
            )}
            <Text style={[styles.text, titleStyle]}>{title}</Text>
            {!!description && (
              <Text style={[styles.subtitle, subtitleStyle]}>
                {description}
              </Text>
            )}
          </View>
        )}
        {accessoryView}
      </View>
    </Button>
  )
}

export { Component as Cell }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    minHeight: Math.max(
      44,
      AccessorySize.height + contentInset.top + contentInset.bottom,
    ),
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    justifyContent: 'center',
  }),
  row: styleType<ViewStyle>({
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: contentInset.top,
    paddingBottom: contentInset.bottom,
    paddingLeft: contentInset.left,
    paddingRight: contentInset.right,
  }),
  innerColumn: styleType<ViewStyle>({
    flex: 1,
    flexDirection: 'column',
  }),
  innerRow: styleType<ViewStyle>({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  accessory: styleType<ViewStyle>({
    right: 0,
  }),
  text: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.PRIMARY,
    fontSize: 15,
    lineHeight: 22,
  }),
  subtitle: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
    fontSize: 13,
    lineHeight: 19,
    paddingRight: 6,
  }),
}))
