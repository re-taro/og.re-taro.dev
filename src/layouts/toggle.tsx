import { IconButton, useColorMode } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import type { FC } from 'react';

export const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="theme toggle"
      icon={
        colorMode === 'light'
          ? (
            <Icon icon="ri:moon-fill" />
            )
          : (
            <Icon icon="ri:sun-fill" />
            )
      }
      onClick={toggleColorMode}
    />
  );
};
