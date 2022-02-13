import { Section, Cell } from '@/components/List'
import { assignMainType } from '@/redux/modules/userSetting/actions'
import { selectMainType } from '@/redux/modules/userSetting/selectors'
import { MainType } from '@/redux/modules/userSetting/state'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}
type ComponentProps = Props & {
  mainType: MainType
  onPress: (type: MainType) => void
}

const Component: React.FC<ComponentProps> = ({ mainType, onPress }) => {
  return (
    <Section title="表示方法">
      <Cell
        title="リスト"
        accessory={mainType === 'list' ? 'check' : undefined}
        onPress={() => onPress('list')}
      />
      <Cell
        title="地図"
        accessory={mainType === 'map' ? 'check' : undefined}
        onPress={() => onPress('map')}
      />
    </Section>
  )
}

const Container: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const mainType = useSelector(selectMainType)

  const onPress = useCallback(
    (type: MainType) => {
      dispatch(assignMainType(type))
    },
    [dispatch],
  )

  return <Component {...props} mainType={mainType} onPress={onPress} />
}

export { Container as SelectMainTypeSection }
