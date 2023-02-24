import { AspectRatio, Box, Image, Text, Tooltip } from '@chakra-ui/react';
import type { FC } from 'react';

interface ResultSectionProps {
  generatedImageUrl: string
  ogImageUrl: string
  onClick: () => void
}

export const ResultSection: FC<ResultSectionProps> = ({
  generatedImageUrl,
  ogImageUrl,
  onClick,
}) => (
  <Box as="section">
    <AspectRatio ratio={1200 / 630}>
      <Tooltip label={`${ogImageUrl} [click to copy]`} placement="top">
        <Image
          borderRadius={8}
          shadow="xl"
          src={generatedImageUrl}
          alt="OGP"
          width="1200"
          height="630"
          bgGradient="linear(to-br, gray.500, gray.800)"
          onClick={onClick}
          _hover={{ cursor: 'pointer' }}
        />
      </Tooltip>
    </AspectRatio>
    <Tooltip label="click to copy">
      <Text
        onClick={onClick}
        wordBreak="break-all"
        _hover={{
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        fontSize="sm"
        color="gray"
      >
        {ogImageUrl}
      </Text>
    </Tooltip>
  </Box>
);
