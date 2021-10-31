import { Fragment } from 'react';
import Head from 'next/head';
import { Flex, Heading, Text } from '@chakra-ui/react';
import RteForm from '../components/RteForm/RteForm';
import SubmissionsList from '../components/SubmissionsList/SubmissionsList';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Submission app!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Flex m={[4, 'auto']} direction="column" alignItems="center">
        <Flex direction="column" justifySelf="center">
          <Heading textAlign="left" color="blue.600">
            Welcome 👋
          </Heading>
          <Text>Write something down, then submit it!</Text>
          <RteForm />
          <SubmissionsList />
        </Flex>
      </Flex>
    </Fragment>
  );
}
