import { BaseModel } from './BaseModel'
import { stringValue } from './util'

export class Sculpture extends BaseModel {
  static table = 'sculpture'

  /**
   * 彫刻名よみがな
   */
  ruby: string

  /**
   * 作家名
   */
  author: string

  /**
   * 作家名よみがな
   */
  authorRuby: string

  /**
   * 制作年
   */
  year: string

  /**
   * 設置場所
   */
  place: string

  /**
   * 素材
   */
  material: string

  /**
   * サイズ
   */
  size: string

  /**
   * 重量
   */
  weight: string | undefined

  /**
   * 出展
   */
  exhibit: string

  /**
   * 所蔵者
   */
  owner: string

  /**
   * 取得方法
   */
  acquisitionMethod: string | undefined

  /**
   * 備考
   */
  remarks: string | undefined

  constructor(obj: any) {
    super(obj)

    this.ruby = stringValue(obj, 'ruby')
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
    this.remarks = stringValue(obj, 'remarks')
  }
}
