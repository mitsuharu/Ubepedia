import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ClipboardState = {}

const initialState: ClipboardState = {}

const clipboardSlice = createSlice({
  name: 'CLIPBOARD',
  initialState,
  reducers: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    copyToClipboard(
      _state,
      _action: PayloadAction<{ text: string; showResult?: boolean }>,
    ) {},
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
})

export const { copyToClipboard } = clipboardSlice.actions
export const clipboardReducer = clipboardSlice.reducer
