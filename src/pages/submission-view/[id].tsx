import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { Box, Text, Heading, Flex, Link as ChakraLink } from '@chakra-ui/react';
import SubmissionsService from '../../services/SubmissionsService';
import { parseDate } from 'utils/component-utils';

type SubmissionPageProps = {
  id: string;
  content: string;
  createdAt: number;
};

export default function SubmissionPage({
  id,
  content,
  createdAt,
}: SubmissionPageProps) {
  return (
    <Fragment>
      <Head>
        <title>View {id}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box>
        <Link href="/" passHref>
          <ChakraLink
            fontSize="xl"
            textDecoration="underline"
            _hover={{ color: 'blue.300' }}
          >
            ↩ Home
          </ChakraLink>
        </Link>
        <Flex
          p={[3, 10]}
          bg="blue.300"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading as="h1" color="white">
            Viewing submission
          </Heading>
          <Heading wordBreak="break-word" as="h2" color="white">
            {id}
          </Heading>
        </Flex>
        <Box m={[2, 5]}>
          <Text> Submission created at: {parseDate(createdAt)} </Text>
          <Text> Submission content: </Text>
          <Box
            as="article"
            sx={{
              h1: {
                fontSize: '2xl',
              },
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      </Box>
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sService = new SubmissionsService();
  const data = await sService.getSubmissions();
  const paths = data.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const sService = new SubmissionsService();
  const data = await sService.findSubmission({
    id: context.params?.id as string,
  });

  return {
    props: data,
    revalidate: 60,
  };
};
