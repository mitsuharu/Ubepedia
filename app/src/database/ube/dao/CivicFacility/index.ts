import * as SQLite from 'expo-sqlite'
import { CivicFacility } from '@/database/ube/model/CivicFacility'
import { execute } from '../util'

export const fetchCivicFacility = async (
  database: SQLite.Database,
): Promise<CivicFacility[]> => {
  try {
    const sqlStatement = `SELECT * FROM ${CivicFacility.table}`
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
