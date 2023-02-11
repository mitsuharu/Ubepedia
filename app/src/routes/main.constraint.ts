export const MainName = {
  Home: 'Home',
  Detail: 'Detail',
  Search: 'Search',
  Map: 'Map',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MainName = (typeof MainName)[keyof typeof MainName]
