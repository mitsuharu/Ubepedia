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
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from '@/redux/modules/snackbar/slice'
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
import { updatedSearchWithSpotlight } from '@/redux/modules/searchWithSpotlight/slice'
import { selectIsValidated } from '@/redux/modules/searchWithSpotlight/selectors'

/**
 * saga などで直接触りたい時向け（実際は関数で）
 */
let ubeDatabase: SQLite.SQLiteDatabase | undefined

const databaseName = 'ube'
const databaseType = 'db'
const databaseFile = databaseName + '.' + databaseType

/**
 * データベースを開く
 */
const openUbeDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  const assetPath = await FileAsset.loadFilePath('ube', 'db')

  const documentPath = DocumentDirectoryPath + '/' + databaseFile
  const isExistDocumentPath = await exists(documentPath)
  if (!isExistDocumentPath) {
    await copyFile(assetPath, documentPath)
  }

  ubeDatabase = openDatabase(
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

  return ubeDatabase
}

type UbeDataState = {
  database: SQLite.SQLiteDatabase | undefined
  filters: Filters
  setFilters: (value: Filters) => void
}

export const defaultFilters: Filters = INIT_FILTERS

const UbeDataStateContext = createContext<UbeDataState>({} as UbeDataState)

type Props = {
  children: React.ReactNode
}

export const fetchUbeData = async (
  arg: Partial<Pick<UbeDataState, 'database' | 'filters'>>,
): Promise<UbeData | null> => {
  try {
    const database = arg.database ?? ubeDatabase
    const { keyword, hash, categories, hasDisabledToilet } =
      arg.filters ?? defaultFilters

    console.log(`fetchUbeData database: ${!!database}`)
    if (!database) {
      return null
    }

    const enableCivicFacility = categories?.has('civicFacility') ?? true
    const enableCulturalProperty = categories?.has('culturalProperty') ?? true
    const enableSculpture = categories?.has('sculpture') ?? true

    const civicFacilityItems = enableCivicFacility
      ? await fetchCivicFacility({
          database,
          keyword,
          hash,
          hasDisabledToilet,
        })
      : []
    const culturalPropertyItems = enableCulturalProperty
      ? await fetchCulturalProperty({
          database,
          keyword,
          hash,
        })
      : []
    const sculptureItems = enableSculpture
      ? await fetchSculpture({ database, keyword, hash })
      : []

    return {
      civicFacility: makeListData(civicFacilityItems),
      culturalProperty: makeListData(culturalPropertyItems),
      sculpture: makeListData(sculptureItems),
    }
  } catch (e: any) {
    console.warn(`useUbeData#update`, e)
    return null
  }
}

export const UbeDataProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const [database, setDatabase] = useState<SQLite.SQLiteDatabase>()
  const [filters, setFilters] = useState<Filters>(INIT_FILTERS)
  const isValidatedWithSpotlight = useSelector(selectIsValidated)

  const updateDatabase = useCallback(async () => {
    try {
      const db = await openUbeDatabase()
      setDatabase(db)

      if (isValidatedWithSpotlight) {
        dispatch(updatedSearchWithSpotlight())
      }
    } catch (e: any) {
      console.warn(`UbeDataProvider#updateDatabase`, e)
      dispatch(enqueueSnackbar({ message: 'データベースの取得に失敗しました' }))
    }
  }, [dispatch, isValidatedWithSpotlight])

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
  const { database, filters } = useContext(UbeDataStateContext)
  const [results, setResults] = useState<UbeData>(INIT_UBE_DATA)

  const update = useCallback(async () => {
    const value = await fetchUbeData({ database, filters })
    if (value) {
      setResults(value)
    }
  }, [database, filters])

  useEffect(() => {
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database, filters])

  return results
}
