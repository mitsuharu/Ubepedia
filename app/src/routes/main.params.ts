import { UbeDataType } from '@/database/ube/type'

export type MainParams = {
  Home: undefined
  Detail: { item: UbeDataType }
  Search: undefined
  Map: { items: UbeDataType[] }
}
