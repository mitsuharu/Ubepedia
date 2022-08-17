import SQLite from 'react-native-sqlite-storage'
import { CulturalProperty } from '@/database/ube/model/CulturalProperty'
import { loadDataFromSQLite } from '../util'
import { nonFalsy } from '@/utils/arrays'

type Props = {
  database: SQLite.SQLiteDatabase
  keyword: string | null
  hash: string | null
}

export const fetchCulturalProperty = async ({
  database,
  keyword,
  hash,
}: Props): Promise<CulturalProperty[]> => {
  try {
    const selectFrom = `SELECT * FROM ${CulturalProperty.table}`
    const wheres = [
      keyword && `name like '%${keyword}%'`,
      hash && `hash like '${hash}'`,
    ].filter(nonFalsy)

    const sqlStatement =
      selectFrom + (wheres.length > 0 ? ` WHERE ${wheres.join(`AND`)}` : '')

    const results: CulturalProperty[] =
      await loadDataFromSQLite<CulturalProperty>({
        database,
        sqlStatement,
        dataFormatter: (obj) => new CulturalProperty(obj),
      })

    return results
  } catch (e: any) {
    console.warn('fetchCulturalProperty', e)
    return []
  }
}
