import { when, eq, then } from '@/utils/when'

type TestType = 'A' | 'B' | 'C'

describe('when', () => {
  const match = (arg: TestType) =>
    when(arg)
      .on(eq('A'), then('a'))
      .on(eq('B'), then('b'))
      .on(eq('C'), then('c'))
      .otherwise(then(null))

  it.each<[input: TestType, expected: string | null]>([
    ['A', 'a'],
    ['B', 'b'],
    ['C', 'c'],
  ])('match(%s) should return %s', (input, expected) => {
    expect(match(input)).toEqual(expected)
  })
})
