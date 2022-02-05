export const stringValue = (obj: any, key: string): string => {
  try {
    const value = obj[key]
    return value
  } catch (e: any) {
    return ''
  }
}

export const numberValue = (obj: any, key: string): number => {
  try {
    const value = obj[key]
    return Number(value)
  } catch (e: any) {
    return NaN
  }
}
