import { numberValue, stringValue } from './util'

export class Sculpture {
  static table = 'sculpture'

  id: number
  name: string
  ruby: string
  latitude: number
  longitude: number
  author: string
  authorRuby: string
  year: string
  place: string
  material: string
  size: string
  weight: string
  exhibit: string
  owner: string
  acquisitionMethod: string
  homepage: string
  depiction: string

  constructor(obj: any) {
    this.id = numberValue(obj, 'id')
    this.name = stringValue(obj, 'name')
    this.ruby = stringValue(obj, 'ruby')
    this.latitude = numberValue(obj, 'latitude')
    this.longitude = numberValue(obj, 'longitude')
    this.author = stringValue(obj, 'author')
    this.authorRuby = stringValue(obj, 'author_ruby')
    this.year = stringValue(obj, 'year')
    this.place = stringValue(obj, 'place')
    this.material = stringValue(obj, 'material')
    this.size = stringValue(obj, 'size')
    this.weight = stringValue(obj, 'weight')
    this.exhibit = stringValue(obj, 'exhibit')
    this.owner = stringValue(obj, 'owner')
    this.acquisitionMethod = stringValue(obj, 'acquisition_method')
    this.homepage = stringValue(obj, 'homepage')
    this.depiction = stringValue(obj, 'depiction')
  }
}
