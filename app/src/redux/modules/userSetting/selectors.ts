import { RootState } from '@/redux/RootState'

export const selectCanCopyToClipboardOnLongPress = (state: RootState) =>
  state.userSetting.canCopyToClipboardOnLongPress
