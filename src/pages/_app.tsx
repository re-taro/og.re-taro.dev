import '@/styles/globals.css'
import '@fontsource/outfit/latin.css'
import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { customTheme } from '@/styles/themes'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider colorModeManager={localStorageManager} theme={customTheme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
)

export default App
