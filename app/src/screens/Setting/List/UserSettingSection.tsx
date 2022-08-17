import { Section, Cell } from '@/components/List'
import { assignIsValidatedSearchWithSpotlight } from '@/redux/modules/searchWithSpotlight/actions'
import { selectIsValidated } from '@/redux/modules/searchWithSpotlight/selectors'
import { toggleCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/actions'
import { selectCanCopyToClipboardOnLongPress } from '@/redux/modules/userSetting/selectors'
import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}
type ComponentProps = Props & {
  canCopyToClipboard: boolean
  isValidatedSearchWithSpotlight: boolean
  toggleSwitch: () => void
  toggleSpotlight: () => void
}

const Component: React.FC<ComponentProps> = ({
  canCopyToClipboard,
  isValidatedSearchWithSpotlight,
  toggleSwitch,
  toggleSpotlight,
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
      {Platform.OS === 'ios' && (
        <Cell
          title="Spotlightで検索する"
          accessory="switch"
          switchValue={isValidatedSearchWithSpotlight}
          onSwitchValueChange={toggleSpotlight}
          onPress={toggleSpotlight}
        />
      )}
    </Section>
  )
}

const Container: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const canCopyToClipboard = useSelector(selectCanCopyToClipboardOnLongPress)
  const isValidatedSearchWithSpotlight = useSelector(selectIsValidated)

  const toggleSwitch = useCallback(() => {
    dispatch(toggleCanCopyToClipboardOnLongPress())
  }, [dispatch])

  const toggleSpotlight = useCallback(() => {
    dispatch(
      assignIsValidatedSearchWithSpotlight(!isValidatedSearchWithSpotlight),
    )
  }, [dispatch, isValidatedSearchWithSpotlight])

  return (
    <Component
      {...props}
      canCopyToClipboard={canCopyToClipboard}
      isValidatedSearchWithSpotlight={isValidatedSearchWithSpotlight}
      toggleSwitch={toggleSwitch}
      toggleSpotlight={toggleSpotlight}
    />
  )
}

export { Container as UserSettingSection }
