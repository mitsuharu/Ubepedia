export const SettingName = {
  Setting: 'Setting',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SettingName = typeof SettingName[keyof typeof SettingName]
