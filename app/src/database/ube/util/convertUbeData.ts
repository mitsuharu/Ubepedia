import { UbeDataType } from '../type'
import { CivicFacility } from '@/database/ube/model/CivicFacility'
import { CulturalProperty } from '@/database/ube/model/CulturalProperty'
import { Sculpture } from '@/database/ube/model/Sculpture'

export const isCivicFacility = (
  arg: any | null | undefined,
): arg is CivicFacility => !!arg && arg instanceof CivicFacility

export const isCulturalProperty = (
  arg: any | null | undefined,
): arg is CulturalProperty => !!arg && arg instanceof CulturalProperty

export const isSculpture = (arg: any | null | undefined): arg is Sculpture =>
  !!arg && arg instanceof Sculpture

export const convertUbeData = (item: UbeDataType) => {
  const isCf = isCivicFacility(item)
  const isCp = isCulturalProperty(item)
  const isSc = isSculpture(item)

  const title = item.name
  const url = isCf || isSc ? item.homepage : undefined

  const imageUrl = item.depiction

  return { title, url, imageUrl }
}
