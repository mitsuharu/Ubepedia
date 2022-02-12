import { Section, Cell } from '@/components/List'
import { toggleCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/actions'
import { selectCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/selectors'
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
  const canCopyToClipboard = useSelector(selectCanCopyToClipboardOnLongPress)

  const toggleSwitch = useCallback(() => {
    dispatch(toggleCanCopyToClipboardOnLongPress())
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
