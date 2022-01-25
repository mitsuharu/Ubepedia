import * as SQLite from 'expo-sqlite'
import { CulturalProperty } from '@/database/ube/model/CulturalProperty'
import { execute } from '../util'

export const fetchCulturalProperty = async (
  database: SQLite.Database,
): Promise<CulturalProperty[]> => {
  try {
    const sqlStatement = `SELECT * FROM ${CulturalProperty.table}`
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
