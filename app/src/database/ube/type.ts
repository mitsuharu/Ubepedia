import { CivicFacility } from './model/CivicFacility'
import { CulturalProperty } from './model/CulturalProperty'
import { Sculpture } from './model/Sculpture'
import { match } from 'ts-pattern'

export type UbeDataType = CivicFacility | CulturalProperty | Sculpture

export const isCivicFacility = (
  arg: any | null | undefined,
): arg is CivicFacility => !!arg && arg instanceof CivicFacility

export const isCulturalProperty = (
  arg: any | null | undefined,
): arg is CulturalProperty => !!arg && arg instanceof CulturalProperty

export const isSculpture = (arg: any | null | undefined): arg is Sculpture =>
  !!arg && arg instanceof Sculpture

export type ListData<T extends UbeDataType> = {
  items: T[]
  total: number
}

export const makeListData = <T extends UbeDataType>(
  items: T[],
): ListData<T> => ({
  items: items,
  total: items.length,
})

export const makeInitListData = <T extends UbeDataType>(): ListData<T> =>
  makeListData([] as T[])

export type UbeData = {
  civicFacility: ListData<CivicFacility>
  culturalProperty: ListData<CulturalProperty>
  sculpture: ListData<Sculpture>
}

export type UbeDataKey = keyof UbeData

export const ubeDataKeys: UbeDataKey[] = [
  'civicFacility',
  'culturalProperty',
  'sculpture',
]

export const INIT_UBE_DATA: UbeData = {
  civicFacility: makeInitListData<CivicFacility>(),
  culturalProperty: makeInitListData<CulturalProperty>(),
  sculpture: makeInitListData<Sculpture>(),
}

export const ubeDataName = (key: UbeDataKey) =>
  match(key)
    .with('civicFacility', () => '公共施設')
    .with('culturalProperty', () => '文化財')
    .with('sculpture', () => '彫刻')
    .exhaustive()

export type Filters = {
  keyword: string | null

  hash: string | null

  categories: Set<UbeDataKey> | null

  /**
   * 障害者用トイレの有無
   */
  hasDisabledToilet: boolean
}

export const INIT_FILTERS: Filters = {
  keyword: null,
  hash: null,
  categories: null,
  hasDisabledToilet: false,
}
