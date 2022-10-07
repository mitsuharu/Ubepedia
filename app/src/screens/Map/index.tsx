import React, { useEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsConnected } from '@/redux/modules/network/selectors'
import { MainParams } from '@/routes/main.params'
import { enqueueSnackbar } from '@/redux/modules/snackbar/slice'
import { OpenMapButton } from '@/components/Button/OpenMapButton'
import { UbeMapView } from '@/components/Map/UbeMapView'
import { UbeDataType } from '@/database/ube/type'

type ParamsProps = RouteProp<MainParams, 'Map'>
type Props = {}

const HeaderRight: React.FC<{ item: UbeDataType }> = ({ item }) => {
  const { latitude, longitude, name } = item
  return (
    <OpenMapButton latitude={latitude} longitude={longitude} query={name} />
  )
}

const Container: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<ParamsProps>()
  const isConnected = useSelector(selectIsConnected)

  const { item } = route.params

  useEffect(() => {
    navigation.setOptions({
      title: item.name,
      headerTransparent: true,
      headerRight: () => <HeaderRight item={item} />,
    })
  }, [item, navigation])

  useEffect(() => {
    if (!isConnected) {
      dispatch(
        enqueueSnackbar({
          message: 'ネットワークに接続できません',
          type: 'error',
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])

  return <UbeMapView items={[item]} />
}

export { Container as Map }
