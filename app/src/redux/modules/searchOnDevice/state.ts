export type SearchOnDeviceState = {
  isValidated: boolean
  updatedAt: number
}

export const initialState: Readonly<SearchOnDeviceState> = {
  isValidated: true,
  updatedAt: 0,
}
