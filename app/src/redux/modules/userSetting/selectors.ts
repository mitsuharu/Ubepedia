import { RootState } from '@/redux/RootState'

export const selectMainType = (state: RootState) => state.userSetting.mainType

export const selectCanCopyToClipboardOnLongPress = (state: RootState) =>
  state.userSetting.canCopyToClipboardOnLongPress
