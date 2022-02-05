import { BaseModel } from './BaseModel'
import { stringValue } from './util'

export class CulturalProperty extends BaseModel {
  static table = 'cultural_property'

  /**
   * 文化財区分
   */
  category: string

  /**
   * 文化財区分（副）
   */
  subCategory: string

  /**
   * 登録・指定年月日
   */
  designatedDate: string

  /**
   * 所有者・管理者・保存団体
   */
  administrator: string

  /**
   * 所在地
   */
  place: string

  /**
   * 制作年代等
   */
  productionAge: string

  constructor(obj: any) {
    super(obj)

    this.category = stringValue(obj, 'category')
    this.subCategory = stringValue(obj, 'sub_category')
    this.designatedDate = stringValue(obj, 'designated_date')
    this.administrator = stringValue(obj, 'administrator')
    this.place = stringValue(obj, 'place')
    this.productionAge = stringValue(obj, 'production_age')
  }
}
