export type SearchWithSpotlightState = {
  isValidated: boolean
  updatedAt: number
}

export const initialState: Readonly<SearchWithSpotlightState> = {
  isValidated: true,
  updatedAt: 0,
}
