export type ToastType = 'success' | 'error' | 'info'

export type SnackbarItem = {
  message: string
  createdAt: number
  type: ToastType
}

export type SnackbarState = {
  itemQueue: SnackbarItem[]
}

export const initialState: Readonly<SnackbarState> = {
  itemQueue: [],
}
