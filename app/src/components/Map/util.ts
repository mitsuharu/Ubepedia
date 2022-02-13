import { UbeDataType } from '@/database/ube/type'
import { Region, LatLng, EdgePadding } from 'react-native-maps'

const INIT_REGION: Region = {
  latitude: 33.9515908,
  longitude: 131.2465881,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

export const makeInitRegion = (items: UbeDataType[]): Region => {
  if (items.length === 1) {
    const [{ latitude, longitude }] = items
    const region: Region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
    return region
  }
  return INIT_REGION
}

export const makeCoordinates = (items: UbeDataType[]): LatLng[] => {
  return items.map<LatLng>((item) => ({
    latitude: item.latitude,
    longitude: item.longitude,
  }))
}

export const FIT_EDGE_PADDING: EdgePadding = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
}
