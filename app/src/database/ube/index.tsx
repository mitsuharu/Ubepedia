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
  filters: Filters
  setFilters: (value: Filters) => void
}

const UbeDataStateContext = createContext<UbeDataState>({} as UbeDataState)

type Props = {
  children: React.ReactNode
}

export const UbeDataProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const [database, setDatabase] = useState<SQLite.Database>()
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
