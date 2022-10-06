import { Section } from '@/components/List'
import { Cell } from '@/components/List/Cell'
import { UbeDataType } from '@/database/ube/type'
import { openWeb } from '@/redux/modules/inAppWebBrowser/slice'
import React, { useCallback } from 'react'
import { Falsy } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

type Props = {
  item: UbeDataType
}
type ComponentProps = Props & {
  onPressOpenWeb: (() => void) | Falsy
}

const Component: React.FC<ComponentProps> = ({ onPressOpenWeb }) => {
  return (
    <SafeAreaView edges={['bottom']}>
      {!!onPressOpenWeb && (
        <Section>
          <Cell
            title="ホームページを開く"
            onPress={onPressOpenWeb}
            accessory="link"
          />
        </Section>
      )}
    </SafeAreaView>
  )
}

const Container: React.FC<Props> = (props) => {
  const {
    item: { url },
  } = props

  const dispatch = useDispatch()

  const onPressOpenWeb = useCallback(() => {
    if (url) {
      dispatch(openWeb(url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return <Component {...props} onPressOpenWeb={!!url && onPressOpenWeb} />
}

export { Container as DetailFooterComponent }
