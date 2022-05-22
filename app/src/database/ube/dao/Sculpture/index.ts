import SQLite from 'react-native-sqlite-storage'
import { Sculpture } from '@/database/ube/model/Sculpture'
import { loadDataFromSQLite } from '../util'
import { nonFalsy } from '@/utils/arrays'

type Props = {
  database: SQLite.SQLiteDatabase
  keyword: string | null
}

export const fetchSculpture = async ({
  database,
  keyword,
}: Props): Promise<Sculpture[]> => {
  try {
    const selectFrom = `SELECT * FROM ${Sculpture.table}`
    const wheres = [keyword && `name like '%${keyword}%'`].filter(nonFalsy)

    const sqlStatement =
      selectFrom + (wheres.length > 0 ? ` WHERE ${wheres.join(`AND`)}` : '')

    const results: Sculpture[] = await loadDataFromSQLite<Sculpture>({
      database,
      sqlStatement,
      dataFormatter: (obj) => new Sculpture(obj),
    })

    return results
  } catch (e: any) {
    console.warn('fetchSculpture', e)
    return []
  }
}
