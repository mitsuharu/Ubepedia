import React, { useCallback, useMemo } from 'react'
import { Cell, Props as ButtonProps } from '@/components/List/Cell'
import { useDispatch, useSelector } from 'react-redux'
import { selectCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/selectors'
import { copyToClipboard } from '@/redux/modules/clipboard/actions'

type Props = Omit<ButtonProps, 'onLongPress'>

export const DetailCell: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const canCopyToClipboard: boolean = useSelector(
    selectCanCopyToClipboardOnLongPress,
  )

  const copy = useCallback(() => {
    const { title } = props
    if (title) {
      dispatch(copyToClipboard({ text: title, showResult: true }))
    }
  }, [dispatch, props])

  const onLongPress = useMemo(
    () => (canCopyToClipboard ? copy : undefined),
    [canCopyToClipboard, copy],
  )

  return <Cell {...props} onLongPress={onLongPress} />
}
