import { offlineActionCreators, offlineActionTypes } from 'react-native-offline'

/**
 * オフライン状態への移行をwatchする
 * @example `yield take(watchConnectionOffline)`
 */
export const watchConnectionOffline = (
  action: offlineActionCreators.ConnectionChangeType,
) =>
  action.type === offlineActionTypes.CONNECTION_CHANGE &&
  action.payload === false

/**
 * オンライン状態への移行をwatchする
 * @example `yield take(watchConnectionOnline)`
 */
export const watchConnectionOnline = (
  action: offlineActionCreators.ConnectionChangeType,
) =>
  action.type === offlineActionTypes.CONNECTION_CHANGE &&
  action.payload === true
