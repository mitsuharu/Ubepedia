import { CivicFacility } from './model/CivicFacility'
import { CulturalProperty } from './model/CulturalProperty'
import { Sculpture } from './model/Sculpture'
import { match } from 'ts-pattern'

export type ListData<T> = {
  items: T[]
  total: number
}

export const makeListData = <T>(items: T[]): ListData<T> => ({
  items: items,
  total: items.length,
})

export const makeInitListData = <T>(): ListData<T> => makeListData([] as T[])

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
