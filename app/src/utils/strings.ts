import URLParse from 'url-parse'

/**
 * 引数の文字列が URL であるか判定する
 */
export const isValidHttpUrl = (url: string) => {
  try {
    const { protocol } = new URLParse(url)
    return ['https:', 'http:'].includes(protocol)
  } catch (_) {
    return false
  }
}
