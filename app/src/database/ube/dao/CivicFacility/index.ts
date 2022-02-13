import * as SQLite from 'expo-sqlite'
import { CivicFacility } from '@/database/ube/model/CivicFacility'
import { execute } from '../util'
import { nonFalsy } from '@/utils/arrays'

type Props = {
  database: SQLite.Database
  keyword: string | null
  hasDisabledToilet: boolean
}

export const fetchCivicFacility = async ({
  database,
  keyword,
  hasDisabledToilet,
}: Props): Promise<CivicFacility[]> => {
  try {
    const selectFrom = `SELECT * FROM ${CivicFacility.table}`
    const wheres = [
      keyword && `name like '%${keyword}%'`,
      !!hasDisabledToilet && `disabled_toilet like '%有%'`,
    ].filter(nonFalsy)

    const sqlStatement =
      selectFrom + (wheres.length > 0 ? ` WHERE ${wheres.join(`AND`)}` : '')

    const { _array }: SQLite.SQLResultSetRowList = await execute(
      database,
      sqlStatement,
    )
    const results: CivicFacility[] = _array.map<CivicFacility>(
      (obj) => new CivicFacility(obj),
    )
    return results
  } catch (e: any) {
    console.warn('fetchCivicFacility', e)
    return []
  }
}
