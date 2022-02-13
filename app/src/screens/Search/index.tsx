import React, { useCallback, useLayoutEffect, useState } from 'react'
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
  useColorScheme,
  ViewStyle,
} from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'
import { Cell, Section } from '@/components/List'
import { useUbeFilters } from '@/database/ube'
import { Filters, INIT_FILTERS, ubeDataName } from '@/database/ube/type'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}
type ComponentProps = Props & {
  keyword: string
  filters: Filters
  onPress: (filters: Filters) => void
}

const Component: React.FC<ComponentProps> = ({ keyword, filters, onPress }) => {
  const styles = useStyles()
  const prefix = keyword ? `"${keyword}"を含む` : ''

  return (
    <ScrollView
      style={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Section title="現在の条件">
        <Cell
          title={filters.keyword ? filters.keyword : '未設定'}
          subtitle="キーワード"
        />
        <Cell
          title={
            filters.categories
              ? [...filters.categories].map((it) => ubeDataName(it)).join(`, `)
              : '未設定'
          }
          subtitle="カテゴリー"
        />
        <Cell
          title={filters.hasDisabledToilet ? '有り' : '無し'}
          subtitle="障害者トイレ"
        />
      </Section>

      <Section title="絞り込み">
        <Cell
          title="障害者トイレがある公共施設を検索"
          onPress={() =>
            onPress({
              keyword: null,
              categories: new Set(['civicFacility']),
              hasDisabledToilet: true,
            })
          }
          accessory="disclosure"
        />
      </Section>
      <Section title="カテゴリー">
        <Cell
          title={prefix + 'すべてのカテゴリーを検索'}
          onPress={() => onPress({ ...INIT_FILTERS, keyword })}
          accessory="disclosure"
        />
        <Cell
          title={prefix + '公共施設を検索'}
          onPress={() =>
            onPress({
              ...INIT_FILTERS,
              keyword,
              categories: new Set(['civicFacility']),
            })
          }
          accessory="disclosure"
        />
        <Cell
          title={prefix + '文化財を検索'}
          onPress={() =>
            onPress({
              ...INIT_FILTERS,
              keyword,
              categories: new Set(['culturalProperty']),
            })
          }
          accessory="disclosure"
        />
        <Cell
          title={prefix + '彫刻を検索'}
          onPress={() =>
            onPress({
              ...INIT_FILTERS,
              keyword,
              categories: new Set(['sculpture']),
            })
          }
          accessory="disclosure"
        />
      </Section>
      <Section>
        <Cell
          title="条件クリア"
          onPress={() => onPress(INIT_FILTERS)}
          accessory="disclosure"
        />
      </Section>
      <SafeAreaView edges={['bottom']} />
    </ScrollView>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const { filters, setFilters } = useUbeFilters()
  const [keyword, setKeyword] = useState<string>(filters.keyword ?? '')

  const onChangeText = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setKeyword(event.nativeEvent.text)
    },
    [],
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '検索',
      headerSearchBarOptions: {
        hideWhenScrolling: false,
        onChangeText: onChangeText,
      },
    })
  }, [navigation, onChangeText])

  const onPress = useCallback(
    (arg: Filters) => {
      setFilters(arg)
      navigation.navigate('Home')
    },
    [navigation, setFilters],
  )

  return (
    <Component
      {...props}
      keyword={keyword}
      filters={filters}
      onPress={onPress}
    />
  )
}

export { Container as Search }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  scrollView: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
  }),
}))
