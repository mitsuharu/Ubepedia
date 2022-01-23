import { RootState } from '@/redux/RootState'
import { ToastItem } from '@/redux/modules/toast/state'

const selectToastItemQueue = (state: RootState) => state.toast.itemQueue

export const selectToastItem = (state: RootState): ToastItem | undefined => {
  const items = selectToastItemQueue(state)
  return [...items].sort((a, b) => a.createdAt - b.createdAt)?.[0]
}
