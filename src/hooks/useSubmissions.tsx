import useSWR from 'swr';
import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Submission } from '../types/common';
import { buildToastOptions } from './utils';

async function sendDeleteRequest(id: string) {
  const res = await fetch(`/api/submissions/${id}`, {
    method: 'DELETE',
  });
  return res;
}

const INITIAL_STATE_LOADING = {} as Record<string, boolean>;
const INITIAL_STATE_ERROR = {} as Record<string, string>;

export default function useSubmissions() {
  const toast = useToast();
  const { data, error, mutate } =
    useSWR<Submission[], { error: string }>('/api/submissions');
  const submissionGetLoading = !data && !error;
  const [deleteSubmissionState, setDeleteSubmissionState] = useState({
    loading: data?.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, INITIAL_STATE_LOADING),
    error: data?.reduce((acc, curr) => {
      acc[curr.id] = '';
      return acc;
    }, INITIAL_STATE_ERROR),
  });

  const deleteSubmission = useCallback(
    async (id: string) => {
      setDeleteSubmissionState((prevState) => {
        return {
          ...prevState,
          loading: { ...prevState.loading, [id]: true },
        };
      });
      try {
        const res = await sendDeleteRequest(id);
        toast(buildToastOptions(res.status, 'Delete'));
        mutate(data?.filter(({ id: subId }) => id !== subId));
        setDeleteSubmissionState((prevState) => {
          return {
            ...prevState,
            loading: { ...prevState.loading, [id]: false },
          };
        });
      } catch (error) {
        setDeleteSubmissionState((prevState) => {
          return {
            error: { ...prevState.error, [id]: error as string },
            loading: { ...prevState.loading, [id]: false },
          };
        });
      }
    },
    [data, mutate, toast]
  );

  return {
    deleteSubmission,
    submissions: data,
    submissionError: error,
    submissionLoading: submissionGetLoading,
    deleteSubmissionError: deleteSubmissionState.error,
    deleteSubmissionLoading: deleteSubmissionState.loading,
  };
}
