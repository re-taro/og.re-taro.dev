import { Flex, Link, Text } from '@chakra-ui/react';
import type { FC } from 'react';

export const Footer: FC = () => (
  <Flex as="footer" width="full" align="center">
    <Text>
      2022 -
      <Link href="https://re-taro.dev" isExternal>
        re-taro.dev
      </Link>
    </Text>
  </Flex>
);
