import type { DeepPartial, Theme } from '@chakra-ui/react'

/** extend additional color here */
const extendedColors: DeepPartial<
Record<string, Theme['colors']['blackAlpha']>
> = {
  night: {
    500: '#4C566A',
    600: '#434C5E',
    700: '#3B4252',
    800: '#2E3440',
  },
  snow: {
    500: '#ECEFF4',
    600: '#E5E9F0',
    700: '#D8DEE9',
  },
  frost: {
    500: '#8FBCBB',
    600: '#88C0D0',
    700: '#81A1C1',
    800: '#5E81AC',
  },
}

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {}

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
}
