import React, { useCallback, useMemo } from 'react'
import { Cell, Props as ButtonProps } from '@/components/List/Cell'
import { useDispatch, useSelector } from 'react-redux'
import { selectCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/selectors'
import { copyToClipboard } from '@/redux/modules/clipboard/actions'
import { useNavigation } from '@react-navigation/native'
import { UbeDataType } from '@/database/ube/type'

type Props = Omit<ButtonProps, 'onLongPress'> & {
  navigateMap?: UbeDataType
}

export const DetailCell: React.FC<Props> = (props) => {
  const { title, navigateMap: item } = props

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const canCopyToClipboard: boolean = useSelector(
    selectCanCopyToClipboardOnLongPress,
  )

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

  const onPress = useMemo(
    () => (item ? navigateMap : undefined),
    [item, navigateMap],
  )

  const onLongPress = useMemo(
    () => (canCopyToClipboard ? copy : undefined),
    [canCopyToClipboard, copy],
  )

  return (
    <Cell
      {...props}
      onPress={onPress}
      onLongPress={onLongPress}
      accessory={onPress ? 'disclosure' : undefined}
    />
  )
}
