import Link from 'next/link';
import { Text, Flex, Spinner, Link as ChakraLink } from '@chakra-ui/react';
import { parseDate } from 'utils/component-utils';

type SubmissionItemProps = {
  id: string;
  createdAt: number;
  deleteSubmissionLoading: boolean;
  deleteSubmission: (id: string) => void;
};

export default function SubmissionItem({
  id,
  createdAt,
  deleteSubmission,
  deleteSubmissionLoading,
}: SubmissionItemProps) {
  return (
    <Flex
      px={3}
      py={2}
      boxShadow="md"
      borderRadius="md"
      w={['auto', 'sm']}
      alignItems="center"
      justify="space-between"
      border="1px solid black"
      aria-label={`sub-item-${id}`}
    >
      <Link href={`/submission-view/${id}`} passHref>
        <ChakraLink _hover={{ color: '#2B6CB0 ', textDecoration: 'underline' }}>
          {parseDate(createdAt)}
        </ChakraLink>
      </Link>
      <Text
        p={1}
        cursor="pointer"
        _hover={{ boxShadow: '1px 1px 1px 1px', borderRadius: 'md' }}
        onClick={() => deleteSubmission(id)}
      >
        {deleteSubmissionLoading ? (
          <Spinner as="span" title="loading" size="sm" />
        ) : (
          '🗑️'
        )}
      </Text>
    </Flex>
  );
}
