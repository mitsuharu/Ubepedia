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
import { INIT_UBE_DATA, makeListData, UbeData } from './type'
import { fetchCivicFacility } from './dao/CivicFacility'
import { fetchCulturalProperty } from './dao/CulturalProperty'
import { fetchSculpture } from './dao/Sculpture'

/**
 * saga などで直接触りたい時用（なければ廃止予定）
 */
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

export const useUbeData = (): UbeData => {
  const { database } = useContext(UbeDataStateContext)
  const [results, setResults] = useState<UbeData>(INIT_UBE_DATA)

  const update = useCallback(async () => {
    try {
      if (database) {
        const civicFacilityItems = await fetchCivicFacility(database)
        const culturalPropertyItems = await fetchCulturalProperty(database)
        const sculptureItems = await fetchSculpture(database)

        const nextUbeData: UbeData = {
          civicFacility: makeListData(civicFacilityItems),
          culturalProperty: makeListData(culturalPropertyItems),
          sculpture: makeListData(sculptureItems),
        }

        setResults(nextUbeData)
      }
    } catch (e: any) {
      console.warn(`useUbeData#update`, e)
    }
  }, [database])

  useEffect(() => {
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database])

  return results
}
