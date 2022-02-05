export {}
// import React, { useCallback } from 'react'
// import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
// import DisclosureIcon from '@images/others/cell-disclosure.svg'
// import OpenWebIcon from '@images/others/cell-open-web.svg'
// import SelectedIcon from '@images/others/cell-selected.svg'
// import { RequireOne } from '@/@types/RequireOne'
// import { Button } from '@/components/Button'
// import { contentInset } from '@/components/List/util'
// import { COLOR } from '@/CONSTANTS/COLOR'
// import { StyleProps, useStyleProps } from '@/utils/hooks/useStyleProps'
// import { combinedStyles, memoizeStyleSheet, styleType } from '@/utils/style'
// import { Size } from '@/utils/types/Size'

// type Accessory =
//   | undefined
//   | 'disclosure'
//   | 'openWeb'
//   | 'selected'
//   | 'unselected'

// type ContentProps = RequireOne<{ title?: string; children?: React.ReactNode }>

// export type CellProps = ContentProps & {
//   subtitle?: string
//   description?: string
//   onPress?: () => void

//   /**
//    * titleとsubtitleを横に並べるならtrue。デフォルトはfalse。
//    */
//   isRowDirection?: boolean

//   /**
//    * 右端に表示するアイコン。
//    * - 'disclosure' の場合、「>」
//    * - 'openWeb' の場合、「□」
//    */
//   accessory?: Accessory

//   style?: ViewStyle | ViewStyle[]
//   titleStyle?: TextStyle | TextStyle[]
//   subtitleStyle?: TextStyle | TextStyle[]
// }

// const AccessorySize: Size = { width: 24, height: 24 }

// const Component: React.FC<CellProps> = ({
//   title,
//   children,
//   subtitle,
//   description,
//   onPress,
//   style,
//   titleStyle,
//   subtitleStyle,
//   isRowDirection,
//   accessory,
// }) => {
//   const styleProps = useStyleProps()
//   const { isDarkTheme } = styleProps
//   const styles = getStyles(styleProps)

//   const accessoryView = useCallback(() => {
//     const { width, height } = AccessorySize
//     switch (accessory) {
//       case 'disclosure':
//         return (
//           <DisclosureIcon
//             width={width}
//             height={height}
//             style={styles.accessory}
//             fill={COLOR(isDarkTheme).TEXT.DESCRIPTION}
//           />
//         )
//       case 'openWeb':
//         return (
//           <OpenWebIcon
//             width={width}
//             height={height}
//             style={styles.accessory}
//             fill={COLOR(isDarkTheme).TEXT.DESCRIPTION}
//           />
//         )
//       case 'selected':
//       case 'unselected': {
//         const fillColor =
//           accessory === 'selected'
//             ? COLOR(isDarkTheme).BRAND.PRIMARY
//             : COLOR(isDarkTheme).TEXT.INACTIVE
//         return (
//           <SelectedIcon
//             width={width}
//             height={height}
//             style={styles.accessory}
//             fill={fillColor}
//           />
//         )
//       }
//       default:
//         return null
//     }
//   }, [accessory, styles, isDarkTheme])

//   return (
//     <Button style={combinedStyles(styles.container, style)} onPress={onPress}>
//       {!!children && children}
//       <View style={styles.row}>
//         {!!title && (
//           <View style={isRowDirection ? styles.innerRow : styles.innerColumn}>
//             {!!subtitle && (
//               <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
//             )}
//             <Text style={[styles.text, titleStyle]}>{title}</Text>
//             {!!description && (
//               <Text style={[styles.subtitle, subtitleStyle]}>
//                 {description}
//               </Text>
//             )}
//           </View>
//         )}
//         {accessoryView()}
//       </View>
//     </Button>
//   )
// }

// export { Component as Cell }

// const getStyles = memoizeStyleSheet(({ isDarkTheme }: StyleProps) => {
//   const styles = StyleSheet.create({
//     container: styleType<ViewStyle>({
//       minHeight: Math.max(
//         44,
//         AccessorySize.height + contentInset.top + contentInset.bottom,
//       ),
//       backgroundColor: COLOR(isDarkTheme).BACKGROUND.SECONDARY,
//       justifyContent: 'center',
//     }),
//     row: styleType<ViewStyle>({
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection: 'row',
//       paddingTop: contentInset.top,
//       paddingBottom: contentInset.bottom,
//       paddingLeft: contentInset.left,
//       paddingRight: contentInset.right,
//     }),
//     innerColumn: styleType<ViewStyle>({
//       flex: 1,
//       flexDirection: 'column',
//     }),
//     innerRow: styleType<ViewStyle>({
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }),
//     accessory: styleType<ViewStyle>({
//       right: 0,
//     }),
//     text: styleType<TextStyle>({
//       color: COLOR(isDarkTheme).TEXT.PRIMARY,
//       fontSize: 15,
//       lineHeight: 22,
//     }),
//     subtitle: styleType<TextStyle>({
//       color: COLOR(isDarkTheme).TEXT.DESCRIPTION,
//       fontSize: 13,
//       lineHeight: 19,
//       paddingRight: 6,
//     }),
//   })
//   return styles
// })
