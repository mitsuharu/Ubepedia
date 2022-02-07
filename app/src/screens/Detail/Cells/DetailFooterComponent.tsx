import { Section } from '@/components/List'
import { Cell } from '@/components/List/Cell'
import { UbeDataType } from '@/database/ube/type'
import React, { useCallback } from 'react'
import { Falsy } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  item: UbeDataType
}
type ComponentProps = Props & {
  onPress: (() => void) | Falsy
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  return (
    <SafeAreaView edges={['bottom']}>
      {!!onPress && (
        <Section>
          <Cell
            title="ホームページを開く"
            onPress={onPress}
            accessory="disclosure"
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

  const onPress = useCallback(() => {
    if (url) {
    }
  }, [url])

  return <Component {...props} onPress={!!url && onPress} />
}

export { Container as DetailFooterComponent }
