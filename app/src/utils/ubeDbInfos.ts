import ubeDbJson from '@assets/database/ube_db.json'

export type UbeDbInfo = {
  name: string
  table: string
  url: string
  lastUpdatedAt: string
}

export const getUbeDbInfos = (): UbeDbInfo[] => {
  try {
    const results: UbeDbInfo[] = ubeDbJson as UbeDbInfo[]
    return results
  } catch (e: any) {
    console.warn(`getUbeDbInfos`, e)
    return []
  }
}
