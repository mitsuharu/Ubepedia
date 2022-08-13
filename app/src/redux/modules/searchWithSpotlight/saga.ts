import { BaseModel } from '@/database/ube/model/BaseModel'
import * as SearchWithSpotlight from 'react-native-search-with-spotlight'
import { EventChannel, eventChannel, SagaIterator } from 'redux-saga'
import { call, cancelled, fork, takeEvery } from 'redux-saga/effects'
import { updatedSearchWithSpotlight } from './actions'

export function* searchWithSpotlightSaga() {
  const result: boolean = yield call(isSupported)
  if (!result) {
    return
  }

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

function* updatedSearchWithSpotlightSaga({
  payload,
}: ReturnType<typeof updatedSearchWithSpotlight>) {
  try {
    yield call(SearchWithSpotlight.deleteAll)

    if (!payload) {
      return
    }
    const { civicFacility, culturalProperty, sculpture } = payload

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

  const key = BaseModel.decodeKey(id)
}
