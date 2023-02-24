import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Stack
    mb={8}
    w="full"
    textAlign="center"
    minHeight="70vh"
    justifyContent="center"
  >
    <Heading>🖼️ og-img</Heading>
    <Text>Edge service to generate embeddable dynamic OpenGraph image</Text>
    <Flex justifyContent="center">
      <Button as={Link} href="/generate" colorScheme="teal">
        Generate
      </Button>
    </Flex>
  </Stack>
);

export default Home;
