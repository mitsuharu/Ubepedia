import SQLite from 'react-native-sqlite-storage'

export type WhereQuery = {
  keyword?: string
}

export const execute = (
  database: SQLite.SQLiteDatabase,
  sqlStatement: string,
): Promise<SQLite.ResultSetRowList> => {
  return new Promise((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          sqlStatement,
          [],
          (_, { rows }) => {
            resolve(rows)
          },
          (e) => {
            reject(e)
            return true
          },
        )
      },
      (e) => {
        reject(e)
      },
    )
  })
}

/*
    const { raw }: SQLite.ResultSetRowList = await execute(
      database,
      sqlStatement,
    )
    const results: CivicFacility[] = raw().map<CivicFacility>(
      (obj) => new CivicFacility(obj),
    )

*/

type LoadSQLiteParams<T> = {
  database: SQLite.SQLiteDatabase
  sqlStatement: string
  dataFormatter?: (obj: any) => T
}

export const loadDataFromSQLite = async <T>({
  database,
  sqlStatement,
  dataFormatter,
}: LoadSQLiteParams<T>): Promise<T[]> => {
  try {
    const { raw }: SQLite.ResultSetRowList = await execute(
      database,
      sqlStatement,
    )
    const results: T[] = raw().map<T>((obj: any) =>
      dataFormatter ? dataFormatter(obj) : (obj as T),
    )
    return results
  } catch (e: any) {
    console.warn(`loadSQLite`, e)
    throw e
  }
}
