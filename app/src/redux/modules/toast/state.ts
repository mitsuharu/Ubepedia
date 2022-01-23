export type ToastType = 'success' | 'error' | 'info'

export type ToastItem = {
  message: string
  createdAt: number
  type: ToastType
}

export type ToastState = {
  itemQueue: ToastItem[]
}

export const initialState: Readonly<ToastState> = {
  itemQueue: [],
}
