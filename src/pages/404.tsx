import {
  Button,
  Box as ChakraBox,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Box } from '@/components/motion/box'
import type { NextPage } from 'next'

const Page404: NextPage = () => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Box
        animate={{ y: -20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
        width={['100%', '70%', '60%', '60%']}
        margin="0 auto"
      >
        <Image
          src="/undraw_no_data_re_kwbl.svg"
          alt="Error 404 not found Illustration"
        />
      </Box>
      <Text textAlign="center" fontSize="xs">
        <ChakraLink href="https://undraw.co/illustrations" isExternal>
          Illustration by unDraw
        </ChakraLink>
      </Text>
      <ChakraBox marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>
        <ChakraBox textAlign="center" marginTop={4}>
          <Text>It&apos;s Okay!</Text>
          <Button
            as={Link}
            href="/"
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
          >
            Let&apos;s Head Back
          </Button>
        </ChakraBox>
      </ChakraBox>
    </>
  )
}

export default Page404
