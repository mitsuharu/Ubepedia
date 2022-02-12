import { RootState } from '@/redux/RootState'

export const selectOnLongPressCopyToClipboard = (state: RootState) =>
  state.userSetting.onLongPressCopyToClipboard
