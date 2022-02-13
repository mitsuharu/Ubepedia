import * as SQLite from 'expo-sqlite'
import { CulturalProperty } from '@/database/ube/model/CulturalProperty'
import { execute } from '../util'
import { nonFalsy } from '@/utils/arrays'

type Props = {
  database: SQLite.Database
  keyword: string | null
}

export const fetchCulturalProperty = async ({
  database,
  keyword,
}: Props): Promise<CulturalProperty[]> => {
  try {
    const selectFrom = `SELECT * FROM ${CulturalProperty.table}`
    const wheres = [keyword && `name like '%${keyword}%'`].filter(nonFalsy)

    const sqlStatement =
      selectFrom + (wheres.length > 0 ? ` WHERE ${wheres.join(`AND`)}` : '')

    const { _array }: SQLite.SQLResultSetRowList = await execute(
      database,
      sqlStatement,
    )
    const results: CulturalProperty[] = _array.map<CulturalProperty>(
      (obj) => new CulturalProperty(obj),
    )
    return results
  } catch (e: any) {
    console.warn('fetchCulturalProperty', e)
    return []
  }
}
