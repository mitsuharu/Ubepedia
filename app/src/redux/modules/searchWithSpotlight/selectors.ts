import { RootState } from '@/redux/RootState'

export const selectIsValidated = (state: RootState) =>
  state.searchWithSpotlight.isValidated

export const selectUpdatedAt = (state: RootState) =>
  state.searchWithSpotlight.updatedAt
