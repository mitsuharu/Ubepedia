export type UserSettingState = {
  /**
   * 長押しでテキストのコピーを行う
   */
  canCopyToClipboardOnLongPress: boolean
}

export const initialState: Readonly<UserSettingState> = {
  canCopyToClipboardOnLongPress: true,
}
