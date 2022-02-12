import { Section, Cell } from '@/components/List'
import { toggleOnLongPressCopyToClipboard } from '@/redux/modules/userSetting/actions'
import { selectOnLongPressCopyToClipboard } from '@/redux/modules/userSetting/selectors'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}
type ComponentProps = Props & {
  canCopyToClipboard: boolean
  toggleSwitch: () => void
}

const Component: React.FC<ComponentProps> = ({
  canCopyToClipboard,
  toggleSwitch,
}) => {
  return (
    <Section title="ユーザー設定">
      <Cell
        title="詳細画面で表示テキストを長押したとき、そのテキストをクリップボードにコピーする"
        accessory="switch"
        switchValue={canCopyToClipboard}
        onSwitchValueChange={toggleSwitch}
        onPress={toggleSwitch}
      />
    </Section>
  )
}

const Container: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const canCopyToClipboard = useSelector(selectOnLongPressCopyToClipboard)

  const toggleSwitch = useCallback(() => {
    dispatch(toggleOnLongPressCopyToClipboard())
  }, [dispatch])

  return (
    <Component
      {...props}
      canCopyToClipboard={canCopyToClipboard}
      toggleSwitch={toggleSwitch}
    />
  )
}

export { Container as UserSettingSection }
