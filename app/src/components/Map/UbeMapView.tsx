import React, { useEffect, useRef } from 'react'
import { ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsConnected } from '@/redux/modules/network/selectors'
import MapView, { Region } from 'react-native-maps'
import { UbeDataType } from '@/database/ube/type'
import { enqueueToast } from '@/redux/modules/toast/actions'
import {
  makeCoordinates,
  FIT_EDGE_PADDING,
  makeInitRegion,
} from '@/components/Map/util'
import { UbeMakers } from '@/components/Map/UbeMakers'

type Props = { items: UbeDataType[] }
type ComponentProps = Props & {
  initialRegion: Region
  mapViewRef: React.Ref<MapView>
}

const Component: React.FC<ComponentProps> = ({
  items,
  initialRegion,
  mapViewRef,
}) => {
  const styles = useStyles()
  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.container}
      ref={mapViewRef}
    >
      <UbeMakers items={items} />
    </MapView>
  )
}

const Container: React.FC<Props> = (props) => {
  const { items } = props
  const dispatch = useDispatch()
  const isConnected = useSelector(selectIsConnected)
  const mapViewRef = useRef<MapView>(null)

  const initialRegionRef = useRef<Region>(makeInitRegion(items))

  // makeInitRegion

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

  useEffect(() => {
    try {
      if (items.length > 1) {
        const coordinates = makeCoordinates(items)
        mapViewRef.current?.fitToCoordinates(coordinates, {
          edgePadding: FIT_EDGE_PADDING,
          animated: false,
        })
      }
    } catch (e: any) {
      console.warn(`UbeMapView#useEffect#items`, e)
    }
  }, [items])

  return (
    <Component
      {...props}
      items={items}
      initialRegion={initialRegionRef.current}
      mapViewRef={mapViewRef}
    />
  )
}

export { Container as UbeMapView }

const useStyles = makeStyles(() => ({
  container: styleType<ViewStyle>({
    flex: 1,
  }),
}))
