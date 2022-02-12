import { RootState } from '@/redux/RootState'

/**
 * react-native-offline が提供するstate処理に使用する selector
 */
export const selectIsConnected = (state: RootState) =>
  !!state.network.isConnected
