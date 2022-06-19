import { Section, Cell } from '@/components/List'
import { COLOR } from '@/CONSTANTS/COLOR'
import { openWeb } from '@/redux/modules/inAppWebBrowser/actions'
import { styleType } from '@/utils/styles'
import { getUbeDbInfos, UbeDbInfo } from '@/utils/ubeDbInfos'
import React, { useCallback } from 'react'
import { TextStyle, useColorScheme } from 'react-native'
import { makeStyles } from 'react-native-swag-styles'
import { useDispatch } from 'react-redux'

type Props = {}
type ComponentProps = Props & {
  infos: UbeDbInfo[]
  onPress: (info: UbeDbInfo) => void
}

const Component: React.FC<ComponentProps> = ({ infos, onPress }) => {
  const styles = useStyles()

  return (
    <Section title="データベース情報">
      {infos.map((info) => (
        <Cell
          title={info.name}
          description={'更新日: ' + info.lastUpdatedAt}
          key={info.name}
          onPress={() => onPress(info)}
          accessory="link"
        />
      ))}
      <Cell
        title="アプリで使用しているデータは、宇部市が提供する最新版のオープンデータと異なる場合があります。ご了承ください。"
        titleStyle={styles.text}
      />
    </Section>
  )
}

const Container: React.FC<Props> = (props) => {
  const infos = getUbeDbInfos()

  const dispatch = useDispatch()

  const onPress = useCallback(
    (info: UbeDbInfo) => {
      dispatch(openWeb(info.url))
    },
    [dispatch],
  )

  return <Component {...props} infos={infos} onPress={onPress} />
}

export { Container as UbeDbInfoSection }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  text: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
    fontSize: 13,
    lineHeight: 19,
  }),
}))
