import SQLite from 'react-native-sqlite-storage'
import { CivicFacility } from '@/database/ube/model/CivicFacility'
import { loadDataFromSQLite } from '../util'
import { nonFalsy } from '@/utils/arrays'

type Props = {
  database: SQLite.SQLiteDatabase
  keyword: string | null
  hash: string | null
  hasDisabledToilet: boolean
}

export const fetchCivicFacility = async ({
  database,
  keyword,
  hash,
  hasDisabledToilet,
}: Props): Promise<CivicFacility[]> => {
  try {
    const selectFrom = `SELECT * FROM ${CivicFacility.table}`
    const wheres = [
      keyword && `name like '%${keyword}%'`,
      hash && `hash like '${hash}'`,
      !!hasDisabledToilet && `disabled_toilet like '%有%'`,
    ].filter(nonFalsy)

    const sqlStatement =
      selectFrom + (wheres.length > 0 ? ` WHERE ${wheres.join(`AND`)}` : '')

    const results: CivicFacility[] = await loadDataFromSQLite<CivicFacility>({
      database,
      sqlStatement,
      dataFormatter: (obj) => new CivicFacility(obj),
    })

    return results
  } catch (e: any) {
    console.warn('fetchCivicFacility', e)
    return []
  }
}
