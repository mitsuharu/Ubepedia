import * as SQLite from 'expo-sqlite'
import { Sculpture } from '@/database/ube/model/Sculpture'
import { execute } from '../util'
import { nonFalsy } from '@/utils/arrays'

type Props = {
  database: SQLite.Database
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
