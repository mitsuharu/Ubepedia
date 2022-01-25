import { numberValue, stringValue } from './util'

export class CivicFacility {
  static table = 'civic_facility'

  id: number
  name: string
  category: string
  latitude: number
  longitude: number
  postalCode: string
  address: string
  phone: string
  fax: string
  email: string
  startTime: string
  endTime: string
  timeNotes: string
  weekClosureDay: string
  closureDay: string
  closureDayNotes: string
  parking: string
  parkingFee: string
  disabledToilet: string
  reservation: string
  homepage: string
  depiction: string
  description: string

  constructor(obj: any) {
    this.id = numberValue(obj, 'id')
    this.name = stringValue(obj, 'name')
    this.category = stringValue(obj, 'category')
    this.latitude = numberValue(obj, 'latitude')
    this.longitude = numberValue(obj, 'longitude')
    this.postalCode = stringValue(obj, 'postal_code')
    this.address = stringValue(obj, 'address')
    this.phone = stringValue(obj, 'phone')
    this.fax = stringValue(obj, 'fax')
    this.email = stringValue(obj, 'email')
    this.startTime = stringValue(obj, 'start_time')
    this.endTime = stringValue(obj, 'end_time')
    this.timeNotes = stringValue(obj, 'time_notes')
    this.weekClosureDay = stringValue(obj, 'week_closure_day')
    this.closureDay = stringValue(obj, 'closure_day')
    this.closureDayNotes = stringValue(obj, 'closure_day_notes')
    this.parking = stringValue(obj, 'parking')
    this.parkingFee = stringValue(obj, 'parking_fee')
    this.disabledToilet = stringValue(obj, 'disabled_toilet')
    this.reservation = stringValue(obj, 'reservation')
    this.homepage = stringValue(obj, 'homepage')
    this.depiction = stringValue(obj, 'depiction')
    this.description = stringValue(obj, 'description')
  }
}
