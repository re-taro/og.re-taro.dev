import { Button, Grid, Heading, Stack, useToast } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/generator/form';
import { ResultSection } from '@/components/generator/result';
import { buildOgImageUrl } from '@/utils/build-og';
import type { OgImageOption } from '@/types/og';
import type { NextPage } from 'next';

const Generate: NextPage = () => {
  const toast = useToast();
  const { watch, register } = useForm<OgImageOption>({
    defaultValues: {
      title: 'OG server',
      date: '2004-04-25',
      domain: 'ogp.re-taro.dev',
    },
  });
  const values = watch();
  const ogImageUrl = useMemo(() => {
    return buildOgImageUrl(values);
  }, [values]);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(ogImageUrl);
    toast({
      status: 'success',
      title: 'OpenGraph image url copied!',
      description: ogImageUrl,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Stack spacing={8} minHeight="70vh" justifyContent="center">
      <Heading size="xl" color="teal">
        Generate OpenGraph image
      </Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={12}
        alignItems="center"
      >
        <Stack spacing={6}>
          <Form register={register} />
          <Button colorScheme="teal" onClick={handleClickCopy}>
            Copy URL
          </Button>
        </Stack>
        <Stack spacing={6}>
          <ResultSection
            generatedImageUrl={ogImageUrl}
            ogImageUrl={ogImageUrl}
            onClick={handleClickCopy}
          />
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Generate;
