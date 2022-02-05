import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'
import { useUbeData } from '@/database/ube'
import { ItemType } from './List/types'
import { Cell } from './List/Cell'
import { SectionHeader } from './List/SectionHeader'
import { ubeDataKeys, ubeDataName } from '@/database/ube/type'
import { match } from 'ts-pattern'
import { ItemSeparator } from '@/components/List/Separator'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}
type ComponentProps = Props & {
  sections: SectionListData<ItemType>[]
  onPress: (item: ItemType) => void
}

const Component: React.FC<ComponentProps> = ({ sections, onPress }) => {
  const styles = useStyles()

  const keyExtractor = useCallback(
    (item: ItemType): string => item.id.toString() + item.name.toString(),
    [],
  )

  const renderItem: SectionListRenderItem<ItemType> = useCallback(
    ({ item }) => <Cell item={item} onPress={() => onPress(item)} />,
    [onPress],
  )

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => <SectionHeader title={title} />,
    [],
  )

  const ListFooterComponent = useMemo(
    () => <SafeAreaView edges={['bottom']} />,
    [],
  )

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const ubeData = useUbeData()

  const [sections, setSections] = useState<SectionListData<ItemType>[]>([])

  const updateSections = useCallback(() => {
    const nextSections = ubeDataKeys.map<SectionListData<ItemType>>((key) => {
      const { civicFacility, culturalProperty, sculpture } = ubeData
      const data = match(key)
        .with('civicFacility', () => civicFacility.items)
        .with('culturalProperty', () => culturalProperty.items)
        .with('sculpture', () => sculpture.items)
        .otherwise(() => [])

      const total = match(key)
        .with('civicFacility', () => civicFacility.total)
        .with('culturalProperty', () => culturalProperty.total)
        .with('sculpture', () => sculpture.total)
        .otherwise(() => 0)

      return {
        title: ubeDataName(key) + ` (${total})`,
        data: data,
      }
    })
    setSections(nextSections)
  }, [ubeData])

  const onPress = useCallback(
    (item: ItemType) => {
      console.log(item.name)
      navigation.navigate('Detail')
    },
    [navigation],
  )

  useEffect(() => {
    console.log(
      `Home#useEffect ubeData ${ubeData.civicFacility.items.length}, ${ubeData.culturalProperty.items.length}, ${ubeData.sculpture.items.length}`,
    )
    updateSections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ubeData])

  return <Component {...props} sections={sections} onPress={onPress} />
}

export { Container as Home }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
}))
