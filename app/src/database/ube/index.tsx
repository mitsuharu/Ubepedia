import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'
import { useDispatch } from 'react-redux'
import { enqueueToast } from '@/redux/modules/toast/actions'
import { fetchCivicFacility } from './dao/CivicFacility'

export let ubeData: SQLite.Database | undefined

const databaseName = 'ube.db'
const databasePath = FileSystem.documentDirectory + 'SQLite/'

/**
 * データベースを開く
 */
const openUbeData = async () => {
  // 端末ローカルにデータベースがなければ、アセットデータをコピーする
  if (!(await FileSystem.getInfoAsync(databasePath + databaseName)).exists) {
    await FileSystem.makeDirectoryAsync(databasePath, { intermediates: true })
    const asset = Asset.fromModule(require('@assets/database/ube.db'))
    await FileSystem.downloadAsync(asset.uri, databasePath + databaseName)
  }

  ubeData = SQLite.openDatabase(databaseName)
  return ubeData
}

type UbeDataState = {
  database: SQLite.Database | undefined
}

const UbeDataStateContext = createContext<UbeDataState>({} as UbeDataState)

type Props = {
  children: React.ReactNode
}

export const UbeDataProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const [database, setDatabase] = useState<SQLite.Database>()

  const updateDatabase = useCallback(async () => {
    try {
      const db = await openUbeData()
      setDatabase(db)
    } catch (e: any) {
      console.warn(`UbeDataProvider#updateDatabase`, e)
      dispatch(enqueueToast({ message: 'データベースの取得に失敗しました' }))
    }
  }, [dispatch])

  useEffect(() => {
    updateDatabase()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UbeDataStateContext.Provider
      value={{
        database,
      }}
    >
      {children}
    </UbeDataStateContext.Provider>
  )
}

/**
 * 聴き放題の価格を取得する。
 */
export const useUbeData = (): SQLite.Database | undefined => {
  const { database } = useContext(UbeDataStateContext)

  // 仮
  if (database) {
    fetchCivicFacility(database)
  }

  return database
}
