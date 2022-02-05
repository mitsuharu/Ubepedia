export const RootName = {
  Main: 'Main',
  Setting: 'Setting',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type RootName = typeof RootName[keyof typeof RootName]
