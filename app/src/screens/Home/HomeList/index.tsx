import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DefaultSectionT,
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
import { HomeCell } from './HomeCell'
import { HomeSectionHeader } from './HomeSectionHeader'
import {
  UbeData,
  ubeDataKeys,
  ubeDataName,
  UbeDataType,
} from '@/database/ube/type'
import { ItemSeparator } from '@/components/List'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  ubeData: UbeData
}
type ComponentProps = Props & {
  sections: SectionListData<UbeDataType>[]
  onPress: (item: UbeDataType) => void
}

const Component: React.FC<ComponentProps> = ({ sections, onPress }) => {
  const styles = useStyles()

  const keyExtractor = useCallback(
    (item: UbeDataType): string => item.id.toString() + item.name.toString(),
    [],
  )

  const renderItem: SectionListRenderItem<UbeDataType> = useCallback(
    ({ item }) => <HomeCell item={item} onPress={() => onPress(item)} />,
    [onPress],
  )

  const renderSectionHeader = useCallback(
    ({
      section,
    }: {
      section: SectionListData<UbeDataType, DefaultSectionT>
    }) => <HomeSectionHeader title={section.title} />,
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

  const { ubeData } = props
  const [sections, setSections] = useState<SectionListData<UbeDataType>[]>([])

  const updateSections = useCallback(() => {
    const nextSections = ubeDataKeys.map<SectionListData<UbeDataType>>(
      (key) => {
        const { civicFacility, culturalProperty, sculpture } = ubeData
        switch (key) {
          case 'civicFacility':
            return {
              title: ubeDataName(key) + ` (${civicFacility.total})`,
              data: civicFacility.items,
            }
          case 'culturalProperty':
            return {
              title: ubeDataName(key) + ` (${culturalProperty.total})`,
              data: culturalProperty.items,
            }
          case 'sculpture':
            return {
              title: ubeDataName(key) + ` (${sculpture.total})`,
              data: sculpture.items,
            }
        }
      },
    )
    setSections(nextSections)
  }, [ubeData])

  const onPress = useCallback(
    (item: UbeDataType) => {
      navigation.navigate('Detail', { item })
    },
    [navigation],
  )

  useEffect(() => {
    updateSections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ubeData])

  return <Component {...props} sections={sections} onPress={onPress} />
}

export { Container as HomeList }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
}))
