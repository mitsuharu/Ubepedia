import {
  isCivicFacility,
  isCulturalProperty,
  isSculpture,
  UbeDataType,
} from '@/database/ube/type'
import React from 'react'
import { Callout, Marker } from 'react-native-maps'
import { UbeCallout } from './UbeCallout'

type Props = {
  items: UbeDataType[]
}

const makePinColor = (item: UbeDataType): string => {
  if (isCulturalProperty(item)) {
    return 'goldenrod'
  }
  if (isCivicFacility(item)) {
    return 'dodgerblue'
  }
  if (isSculpture(item)) {
    return 'limegreen'
  }
  return 'red'
}

export const UbeMakers: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Marker
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          key={item.id.toString() + '_' + item.name}
          pinColor={makePinColor(item)}
        >
          <Callout>
            <UbeCallout
              item={item}
              key={item.id.toString() + '_' + item.name}
            />
          </Callout>
        </Marker>
      ))}
    </>
  )
}
