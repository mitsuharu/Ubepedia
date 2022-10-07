import { defaultFilters, fetchUbeData } from '@/database/ube'
import { BaseModel } from '@/database/ube/model/BaseModel'
import { UbeData, UbeDataType } from '@/database/ube/type'
import * as SearchWithSpotlight from 'react-native-search-with-spotlight'
import { EventChannel, eventChannel, SagaIterator } from 'redux-saga'
import { call, cancelled, fork, put, takeEvery } from 'redux-saga/effects'
import {
  assignIsValidatedSearchWithSpotlight,
  updatedSearchWithSpotlight,
} from './slice'
import * as NavigationService from '@/utils/NavigationService'
import { enqueueSnackbar } from '@/redux/modules/snackbar/slice'

export function* searchWithSpotlightSaga() {
  const result: boolean = yield call(isSupported)
  if (!result) {
    return
  }
  yield takeEvery(
    assignIsValidatedSearchWithSpotlight,
    assignIsValidatedSearchWithSpotlightSaga,
  )
  yield takeEvery(updatedSearchWithSpotlight, updatedSearchWithSpotlightSaga)
  yield call(listenerSaga)
}

function* isSupported() {
  try {
    const result: boolean = yield call(SearchWithSpotlight.isSupported)
    console.log(`searchWithSpotlightSaga#isSupported ${result}`)
    return result
  } catch (e: any) {
    return false
  }
}

function* addSearchableItemsSaga(ubeData: UbeData | null) {
  try {
    yield call(SearchWithSpotlight.deleteAll)
    if (!ubeData) {
      return
    }

    const { civicFacility, culturalProperty, sculpture } = ubeData
    const items = [
      ...civicFacility.items,
      ...culturalProperty.items,
      ...sculpture.items,
    ].map<SearchWithSpotlight.SearchableItem>((it) => ({
      title: it.name,
      id: it.encodeKey(),
      description: it.description ?? null,
      keywords: [it.name, '宇部', 'ube'],
      imageUrl: it.imageUrl ?? null,
      domain: 'ubepedia',
    }))

    yield fork(SearchWithSpotlight.addSearchableItems, items)
    console.log(`searchWithSpotlightSaga#addSearchableItems`)
  } catch (e: any) {
    console.warn(`searchWithSpotlightSaga#addSearchableItems`, e)
  }
}

function* assignIsValidatedSearchWithSpotlightSaga({
  payload,
}: ReturnType<typeof assignIsValidatedSearchWithSpotlight>) {
  if (payload) {
    yield put(updatedSearchWithSpotlight())
  } else {
    yield fork(SearchWithSpotlight.deleteAll)
  }
}

function* updatedSearchWithSpotlightSaga() {
  const ubeData: UbeData | null = yield call(fetchUbeData, {})
  yield call(addSearchableItemsSaga, ubeData)
}

function createSearchOnDeviceEventChannel() {
  const listener = (callback: SearchWithSpotlight.Callback) => {
    return (response: { id: string; query: string }) => {
      callback({ id: response.id, query: response.query })
    }
  }
  return eventChannel((cb) => {
    const subscription = SearchWithSpotlight.addListener(listener(cb))
    return () => {
      subscription.remove()
    }
  })
}

// 端末からの SearchOnDevice のレスポンスを受ける
function* listenerSaga(): SagaIterator {
  const chan: EventChannel<unknown> = yield call(
    createSearchOnDeviceEventChannel,
  )
  try {
    yield takeEvery(chan, launchViaSearchOnDeviceByResponseSaga)
  } catch (e: any) {
    console.warn(`searchWithSpotlightSaga#listenerSaga`, e)
  } finally {
    if (yield cancelled()) {
      chan.close()
    }
  }
}

function* launchViaSearchOnDeviceByResponseSaga({
  id,
  query,
}: SearchWithSpotlight.Response) {
  console.log(`id: ${id}, query: ${query}`)

  if (!id) {
    return
  }

  try {
    const key = BaseModel.decodeKey(id)

    const ubeData: UbeData | null = yield call(fetchUbeData, {
      filters: { ...defaultFilters, hash: key.hash },
    })

    if (ubeData) {
      const { civicFacility, culturalProperty, sculpture } = ubeData
      const item: UbeDataType | null =
        civicFacility.items[0] ??
        culturalProperty.items[0] ??
        sculpture.items[0] ??
        null

      if (item) {
        yield call(NavigationService.navigate, 'Detail', { item })
      }
    }
  } catch (e: any) {
    console.warn(`launchViaSearchOnDeviceByResponseSaga`, e)
    yield put(enqueueSnackbar({ message: '失敗しました' }))
  }
}
