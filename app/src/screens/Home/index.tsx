import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useUbeData } from '@/database/ube'
import { SearchButton } from '@/components/Button/SearchButton'
import { SettingButton } from '@/components/Button/SettingButton'
import { HomeList } from './HomeList'
import { useSelector } from 'react-redux'
import { selectMainType } from '@/redux/modules/userSetting/selectors'
import { HomeMap } from './HomeMap'

type Props = {}

const Container: React.FC<Props> = () => {
  const navigation = useNavigation()

  const ubeData = useUbeData()

  const mainType = useSelector(selectMainType)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ubepedia',
      headerLeft: () => <SettingButton />,
      headerRight: () => <SearchButton />,
    })
  }, [navigation])

  return mainType === 'list' ? (
    <HomeList ubeData={ubeData} />
  ) : (
    <HomeMap ubeData={ubeData} />
  )
}

export { Container as Home }
