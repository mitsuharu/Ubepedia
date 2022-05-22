import SQLite from 'react-native-sqlite-storage'

type LoadSQLiteParams<T> = {
  database: SQLite.SQLiteDatabase
  sqlStatement: string
  dataFormatter?: (obj: any) => T
}

type ExecuteParam = Pick<LoadSQLiteParams<any>, 'database' | 'sqlStatement'>

const execute = ({
  database,
  sqlStatement,
}: ExecuteParam): Promise<SQLite.ResultSetRowList> => {
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

export const loadDataFromSQLite = async <T>({
  database,
  sqlStatement,
  dataFormatter,
}: LoadSQLiteParams<T>): Promise<T[]> => {
  try {
    const { raw }: SQLite.ResultSetRowList = await execute({
      database,
      sqlStatement,
    })
    const results: T[] = raw().map<T>((obj: any) =>
      dataFormatter ? dataFormatter(obj) : (obj as T),
    )
    return results
  } catch (e: any) {
    console.warn(`loadSQLite`, e)
    throw e
  }
}
