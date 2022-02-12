export type UserSettingState = {
  /**
   * 長押しでテキストのコピーを行う
   */
  onLongPressCopyToClipboard: boolean
}

export const initialState: Readonly<UserSettingState> = {
  onLongPressCopyToClipboard: true,
}
