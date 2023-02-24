import { Box, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { ThemeToggle } from './toggle';
import type { FC } from 'react';

export const Header: FC = () => (
  <Flex as="header" width="full" align="center">
    <Heading as="h1" size="md">
      <Link href="/">og-img</Link>
    </Heading>
    <Box marginLeft="auto">
      <ThemeToggle />
    </Box>
  </Flex>
);
