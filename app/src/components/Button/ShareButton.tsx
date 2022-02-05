import React, { useCallback } from 'react'
import {
  Platform,
  Share,
  ShareContent,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from 'react-native'
import { styleType } from '@/utils/styles'
import { useDispatch } from 'react-redux'
import { enqueueToast } from '@/redux/modules/toast/actions'
import { Button } from './index'
import { makeStyles } from 'react-native-swag-styles'
import Icon from 'react-native-vector-icons/Entypo'
import { COLOR } from '@/CONSTANTS/COLOR'

type Props = {
  title: string
  url: string | undefined
}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  const styles = useStyles()
  const iconName = Platform.OS === 'ios' ? 'share-alternative' : 'share'
  return (
    <Button style={styles.container} onPress={onPress}>
      <Icon style={styles.icon} name={iconName} size={20} />
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const { title, url } = props
  const dispatch = useDispatch()

  const onPress = useCallback(async () => {
    if (!url) {
      return
    }
    try {
      const content: ShareContent =
        Platform.OS === 'ios'
          ? { title: title, url: url }
          : { message: `${title} ${url}` }
      await Share.share(content, {
        excludedActivityTypes: [
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.MarkupAsPDF',
          'com.apple.UIKit.activity.PostToVimeo',
          'com.apple.UIKit.activity.PostToWeibo',
          'com.apple.UIKit.activity.PostToTencentWeibo',
          'com.apple.UIKit.activity.PostToFlickr',
        ],
      })
    } catch (error: any) {
      console.warn(`ShareButton#onPress`, error)
      dispatch(enqueueToast({ message: 'シェアに失敗しました' }))
    }
  }, [title, url, dispatch])

  return url ? <Component {...props} onPress={onPress} /> : null
}

export { Container as ShareButton }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  }),
  icon: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
}))
