import {
  Box,
  Text,
  HStack,
  Heading,
  Skeleton,
  SimpleGrid,
} from '@chakra-ui/react';
import useSubmissions from '../../hooks/useSubmissions';
import SubmissionItem from './SubmissionItem/SubmissionItem';

export default function SubmissionsList() {
  const {
    submissions,
    deleteSubmission,
    submissionLoading,
    deleteSubmissionLoading,
  } = useSubmissions();

  return (
    <Box mt={10}>
      <Heading as="h4" fontSize="2xl" color="blue.600">
        Submission List
      </Heading>
      <Text mb={4}>
        Click on a submission box to see the details or click on 🗑️ to delete
        it.
      </Text>
      {submissionLoading ? (
        <HStack spacing={3}>
          <Skeleton h={10} w="sm" />
          <Skeleton h={10} w="sm" />
          <Skeleton h={10} w="sm" />
        </HStack>
      ) : (
        <SimpleGrid columns={[2, 3]} spacing={3}>
          {submissions?.map((item) => (
            <SubmissionItem
              key={item.id}
              id={item.id}
              createdAt={item.createdAt}
              deleteSubmission={deleteSubmission}
              deleteSubmissionLoading={
                deleteSubmissionLoading?.[item.id] as boolean
              }
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
