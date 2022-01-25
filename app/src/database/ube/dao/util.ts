import * as SQLite from 'expo-sqlite'

export type WhereQuery = {
  keyword?: string
}

export const execute = (
  database: SQLite.Database,
  sqlStatement: string,
): Promise<SQLite.SQLResultSetRowList> => {
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
