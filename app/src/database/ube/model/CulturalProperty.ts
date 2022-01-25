import { numberValue, stringValue } from './util'

export class CulturalProperty {
  static table = 'cultural_property'

  id: number
  name: string
  latitude: number
  longitude: number
  description: string
  category: string
  subCategory: string
  designatedDate: string
  administrator: string
  place: string
  productionAge: string
  depiction: string

  constructor(obj: any) {
    this.id = numberValue(obj, 'id')
    this.name = stringValue(obj, 'name')
    this.latitude = numberValue(obj, 'latitude')
    this.longitude = numberValue(obj, 'longitude')
    this.description = stringValue(obj, 'description')
    this.category = stringValue(obj, 'category')
    this.subCategory = stringValue(obj, 'sub_category')
    this.designatedDate = stringValue(obj, 'designated_date')
    this.administrator = stringValue(obj, 'administrator')
    this.place = stringValue(obj, 'place')
    this.productionAge = stringValue(obj, 'production_age')
    this.depiction = stringValue(obj, 'depiction')
  }
}
