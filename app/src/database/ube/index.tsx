import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { copyFile, exists, DocumentDirectoryPath } from 'react-native-fs'
import FileAsset from 'react-native-file-asset'
import SQLite, { openDatabase } from 'react-native-sqlite-storage'
import { useDispatch } from 'react-redux'
import { enqueueSnackbar } from '@/redux/modules/snackbar/actions'
import {
  Filters,
  INIT_FILTERS,
  INIT_UBE_DATA,
  makeListData,
  UbeData,
} from './type'
import { fetchCivicFacility } from './dao/CivicFacility'
import { fetchCulturalProperty } from './dao/CulturalProperty'
import { fetchSculpture } from './dao/Sculpture'

/**
 * saga などで直接触りたい時用（なければ廃止）
 */
export let ubeData: SQLite.SQLiteDatabase | undefined

const databaseName = 'ube'
const databaseType = 'db'
const databaseFile = databaseName + '.' + databaseType

/**
 * データベースを開く
 */
const openUbeData = async (): Promise<SQLite.SQLiteDatabase> => {
  const assetPath = await FileAsset.loadFilePath('ube', 'db')

  const documentPath = DocumentDirectoryPath + '/' + databaseFile
  const isExistDocumentPath = await exists(documentPath)
  if (!isExistDocumentPath) {
    await copyFile(assetPath, documentPath)
  }

  ubeData = openDatabase(
    {
      name: databaseFile,
      location: 'default',
      createFromLocation: databaseFile,
    },
    () => {
      console.log(`DB ${databaseFile} is loaded`)
    },
    (error: SQLite.SQLError) => {
      console.log(`DB ${databaseFile} is not loaded. error: ${error.message}`)
    },
  )

  return ubeData
}

type UbeDataState = {
  database: SQLite.SQLiteDatabase | undefined
  filters: Filters
  setFilters: (value: Filters) => void
}

const UbeDataStateContext = createContext<UbeDataState>({} as UbeDataState)

type Props = {
  children: React.ReactNode
}

export const UbeDataProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const [database, setDatabase] = useState<SQLite.SQLiteDatabase>()
  const [filters, setFilters] = useState<Filters>(INIT_FILTERS)

  const updateDatabase = useCallback(async () => {
    try {
      const db = await openUbeData()
      setDatabase(db)
    } catch (e: any) {
      console.warn(`UbeDataProvider#updateDatabase`, e)
      dispatch(enqueueSnackbar({ message: 'データベースの取得に失敗しました' }))
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
        filters,
        setFilters,
      }}
    >
      {children}
    </UbeDataStateContext.Provider>
  )
}

export const useUbeFilters = () => {
  const { filters, setFilters } = useContext(UbeDataStateContext)
  return { filters, setFilters }
}

export const useUbeData = (): UbeData => {
  const {
    database,
    filters: { keyword, categories, hasDisabledToilet },
  } = useContext(UbeDataStateContext)
  const [results, setResults] = useState<UbeData>(INIT_UBE_DATA)

  const update = useCallback(async () => {
    try {
      if (database) {
        const enableCivicFacility = categories?.has('civicFacility') ?? true
        const enableCulturalProperty =
          categories?.has('culturalProperty') ?? true
        const enableSculpture = categories?.has('sculpture') ?? true

        const civicFacilityItems = enableCivicFacility
          ? await fetchCivicFacility({
              database,
              keyword,
              hasDisabledToilet,
            })
          : []
        const culturalPropertyItems = enableCulturalProperty
          ? await fetchCulturalProperty({
              database,
              keyword,
            })
          : []
        const sculptureItems = enableSculpture
          ? await fetchSculpture({ database, keyword })
          : []

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
  }, [categories, database, hasDisabledToilet, keyword])

  useEffect(() => {
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, database, hasDisabledToilet, keyword])

  return results
}
