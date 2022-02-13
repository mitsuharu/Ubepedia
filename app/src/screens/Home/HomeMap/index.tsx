import React, { useCallback, useEffect, useState } from 'react'
import { UbeData, UbeDataType } from '@/database/ube/type'
import { UbeMapView } from '@/components/Map/UbeMapView'

type Props = {
  ubeData: UbeData
}
type ComponentProps = Props & {
  items: UbeDataType[]
}

const Component: React.FC<ComponentProps> = ({ items }) => {
  return <UbeMapView items={items} />
}

const Container: React.FC<Props> = (props) => {
  const { ubeData } = props

  const [items, setItems] = useState<UbeDataType[]>([])

  const updateItems = useCallback(() => {
    const { civicFacility, culturalProperty, sculpture } = ubeData

    const nextItems: UbeDataType[] = []
    nextItems.push(...civicFacility.items)
    nextItems.push(...culturalProperty.items)
    nextItems.push(...sculpture.items)

    setItems(nextItems)
  }, [ubeData])

  useEffect(() => {
    updateItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ubeData])

  return <Component {...props} items={items} />
}

export { Container as HomeMap }
