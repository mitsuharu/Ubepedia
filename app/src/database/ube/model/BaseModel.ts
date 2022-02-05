import { numberValue, stringValue } from './util'

export class BaseModel {
  static table: string = ''

  /**
   * データ id (必ずしもユニークではないので注意)
   */
  id: number

  /**
   * 名称
   */
  name: string

  /**
   * url (homepage)
   */
  url: string | undefined

  /**
   * 画像データ (depiction)
   */
  imageUrl: string | undefined

  /**
   * 説明
   */
  description: string | undefined

  /**
   * 緯度
   */
  latitude: number

  /**
   * 経度
   */
  longitude: number

  constructor(obj: any) {
    this.id = numberValue(obj, 'id')
    this.name = stringValue(obj, 'name')
    this.url = stringValue(obj, 'homepage')
    this.imageUrl = stringValue(obj, 'depiction')
    this.description = stringValue(obj, 'description')
    this.latitude = numberValue(obj, 'latitude')
    this.longitude = numberValue(obj, 'longitude')
  }
}
