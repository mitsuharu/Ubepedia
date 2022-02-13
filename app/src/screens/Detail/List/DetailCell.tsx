import React, { useCallback, useMemo } from 'react'
import { Cell, Props as CellProps } from '@/components/List/Cell'
import { useDispatch, useSelector } from 'react-redux'
import { selectCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/selectors'
import { copyToClipboard } from '@/redux/modules/clipboard/actions'
import { useNavigation } from '@react-navigation/native'
import { UbeDataType } from '@/database/ube/type'
import { isValidHttpUrl } from '@/utils/strings'
import { openWeb as dispatchOpenWeb } from '@/redux/modules/inAppWebBrowser/actions'

type Props = Omit<CellProps, 'onLongPress'> & {
  navigateMap?: UbeDataType
}

export const DetailCell: React.FC<Props> = (props) => {
  const { title, navigateMap: item } = props

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const canCopyToClipboard: boolean = useSelector(
    selectCanCopyToClipboardOnLongPress,
  )

  const openWeb = useCallback(() => {
    if (!!title && isValidHttpUrl(title)) {
      dispatch(dispatchOpenWeb(title))
    }
  }, [dispatch, title])

  const navigateMap = useCallback(() => {
    if (item) {
      navigation.navigate('Map', { item: item })
    }
  }, [navigation, item])

  const copy = useCallback(() => {
    if (title) {
      dispatch(copyToClipboard({ text: title, showResult: true }))
    }
  }, [dispatch, title])

  const { onPress, accessory } = useMemo((): Pick<
    CellProps,
    'onPress' | 'accessory'
  > => {
    if (item) {
      return { onPress: navigateMap, accessory: 'disclosure' }
    }
    if (!!title && isValidHttpUrl(title)) {
      return { onPress: openWeb, accessory: 'link' }
    }
    return { onPress: undefined, accessory: undefined }
  }, [item, navigateMap, openWeb, title])

  const onLongPress = useMemo(
    () => (canCopyToClipboard ? copy : undefined),
    [canCopyToClipboard, copy],
  )

  return (
    <Cell
      {...props}
      onPress={onPress}
      onLongPress={onLongPress}
      accessory={accessory}
    />
  )
}
