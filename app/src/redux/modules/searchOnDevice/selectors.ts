import { RootState } from '@/redux/RootState'

export const selectIsValidated = (state: RootState) =>
  state.searchOnDevice.isValidated

export const selectUpdatedAt = (state: RootState) =>
  state.searchOnDevice.updatedAt
