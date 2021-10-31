import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import SubmissionsService from '../../services/SubmissionsService';

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
      <Box m={[2, 5]}>
        <Link href="/" passHref>
          <ChakraLink textDecoration="underline"> ↩ Home</ChakraLink>
        </Link>
        <Text>Submission id: {id}</Text>
        <Text> Created at: {createdAt}</Text>
        <Text> Submission content: </Text>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
