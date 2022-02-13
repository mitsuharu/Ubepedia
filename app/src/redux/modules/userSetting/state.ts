export type MainType = 'list' | 'map'

export type UserSettingState = {
  /**
   * Main画面の表示タイプ
   */
  mainType: MainType

  /**
   * 長押しでテキストのコピーを行う
   */
  canCopyToClipboardOnLongPress: boolean
}

export const initialState: Readonly<UserSettingState> = {
  mainType: 'list',
  canCopyToClipboardOnLongPress: false,
}
