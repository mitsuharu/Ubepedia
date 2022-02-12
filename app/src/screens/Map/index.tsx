import React, { useEffect, useMemo } from 'react'
import { ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsConnected } from '@/redux/modules/network/selectors'
import MapView from 'react-native-map-clustering'
import { Callout, Marker, Region } from 'react-native-maps'
import { MainParams } from '@/routes/main.params'
import { UbeDataType } from '@/database/ube/type'
import { enqueueToast } from '@/redux/modules/toast/actions'
import { UbeCallout } from './UbeCallout'
import { OpenMapButton } from '@/components/Button/OpenMapButton'

type ParamsProps = RouteProp<MainParams, 'Map'>

type GeoProps = {
  latitude: number
  longitude: number
}

const makeGeoDelta = (length: number) => (length === 1 ? 0.01 : 0.1)

type Props = {}
type ComponentProps = Props & {
  initialRegion: Region | undefined
  items: UbeDataType[]
}

const Component: React.FC<ComponentProps> = ({ initialRegion, items }) => {
  const styles = useStyles()

  return (
    <MapView initialRegion={initialRegion} style={styles.container}>
      {items.map((item) => (
        <Marker
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          key={item.id}
        >
          <Callout>
            <UbeCallout item={item} />
          </Callout>
        </Marker>
      ))}
    </MapView>
  )
}

const Container: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<ParamsProps>()
  const isConnected = useSelector(selectIsConnected)

  const { items } = route.params

  useEffect(() => {
    navigation.setOptions({
      title: null,
      headerTransparent: true,
      headerRight: () => {
        if (items.length === 1) {
          const [{ latitude, longitude, name }] = items
          return (
            <OpenMapButton
              latitude={latitude}
              longitude={longitude}
              query={name}
            />
          )
        }
        return null
      },
    })
  }, [items, navigation])

  useEffect(() => {
    if (!isConnected) {
      dispatch(
        enqueueToast({
          message: 'ネットワークに接続できません',
          type: 'error',
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])

  const initialRegion: Region | undefined = useMemo(() => {
    if (items.length === 0) {
      return undefined
    }

    const { latitude, longitude }: GeoProps = items.reduce(
      (acc, value) => ({
        latitude: acc.latitude + value.latitude,
        longitude: acc.longitude + value.longitude,
      }),
      {
        latitude: 0,
        longitude: 0,
      },
    )
    const region: Region = {
      latitude: latitude / items.length,
      longitude: longitude / items.length,
      latitudeDelta: makeGeoDelta(items.length),
      longitudeDelta: makeGeoDelta(items.length),
    }
    return region
  }, [items])

  return <Component {...props} initialRegion={initialRegion} items={items} />
}

export { Container as Map }

const useStyles = makeStyles(() => ({
  container: styleType<ViewStyle>({
    flex: 1,
  }),
}))
