import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { components } from './components'

const customTheme = extendTheme({
  colors,
  components,
})

export default customTheme
