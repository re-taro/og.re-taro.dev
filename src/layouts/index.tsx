import { Box } from '@chakra-ui/react';
import { Footer } from './footer';
import { Header } from './header';
import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) =>
  (
    <Box margin="0 auto" maxWidth={1000} transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
