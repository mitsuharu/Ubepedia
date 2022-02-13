import { isValidHttpUrl } from '@/utils/strings'

describe('isValidHttpUrl', () => {
  it.each<[url: string, expected: boolean]>([
    ['www.example.com', false],
    ['javascript:void(0)', false],
    ['https://example..com', true],
    ['http://example..com', true],
  ])('%s.filter(nonNull) should return %s', (url, expected) => {
    expect(isValidHttpUrl(url)).toEqual(expected)
  })
})
