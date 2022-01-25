import * as SQLite from 'expo-sqlite'
import { Sculpture } from '@/database/ube/model/Sculpture'
import { execute } from '../util'

export const fetchSculpture = async (
  database: SQLite.Database,
): Promise<Sculpture[]> => {
  try {
    const sqlStatement = `SELECT * FROM ${Sculpture.table}`
    const { _array }: SQLite.SQLResultSetRowList = await execute(
      database,
      sqlStatement,
    )
    const results: Sculpture[] = _array.map<Sculpture>(
      (obj) => new Sculpture(obj),
    )
    return results
  } catch (e: any) {
    console.warn('fetchSculpture', e)
    return []
  }
}
