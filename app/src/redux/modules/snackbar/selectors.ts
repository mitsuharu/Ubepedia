import { RootState } from '@/redux/RootState'
import { createSelector } from 'reselect'
import { SnackbarItem } from './state'

const selectSnackbarItemQueue = (state: RootState): SnackbarItem[] =>
  state.snackbar.itemQueue

export const selectSnackbarItem = createSelector(
  (state: RootState) => selectSnackbarItemQueue(state),
  (items: SnackbarItem[]) =>
    [...items].sort((a, b) => a.createdAt - b.createdAt)?.[0],
)
