import { BaseModel } from './BaseModel'
import { stringValue } from './util'

export class CivicFacility extends BaseModel {
  static table = 'civic_facility'

  /**
   * 施設区分
   */
  category: string

  /**
   * 郵便番号
   */
  postalCode: string

  /**
   * 住所
   */
  address: string

  /**
   * 電話番号
   */
  phone: string

  /**
   * FAX番号
   */
  fax: string | undefined

  /**
   * メールアドレス
   */
  email: string | undefined

  /**
   * 開館時刻
   */
  startTime: string

  /**
   * 閉館時刻
   */
  endTime: string

  /**
   * 利用時間注意
   */
  timeNotes: string

  /**
   * 休日（曜日）
   */
  weekClosureDay: string

  /**
   * 休日
   */
  closureDay: string

  /**
   * 休日注意
   */
  closureDayNotes: string | undefined

  /**
   * 駐車場
   */
  parking: string

  /**
   * 駐車料
   */
  parkingFee: string

  /**
   * 障害者用トイレ
   */
  disabledToilet: string

  /**
   * 施設予約
   */
  reservation: string | undefined

  constructor(obj: any) {
    super(obj)

    this.category = stringValue(obj, 'category')
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
  }
}
