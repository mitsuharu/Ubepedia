import * as SearchWithSpotlight from 'react-native-search-with-spotlight'
import { EventChannel, eventChannel, SagaIterator } from 'redux-saga'
import { call, cancelled, fork, takeEvery } from 'redux-saga/effects'

export function* searchWithSpotlightSaga() {
  const result: boolean = yield call(isSupported)
  if (!result) {
    return
  }
  yield call(addSearchableItems)
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

function* addSearchableItems() {
  try {
    yield call(SearchWithSpotlight.deleteAll)
    const items: SearchWithSpotlight.SearchableItem[] = [
      {
        title: 'test',
        id: 'test-2',
        description: 'this is a sample for react-native-search-with-spotlight',
        keywords: ['sample', 'spotlight', 'react-native-search-with-spotlight'],
        imageUrl: null,
        domain: 'sample',
      },
    ]
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
}
