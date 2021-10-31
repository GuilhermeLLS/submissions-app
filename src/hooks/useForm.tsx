import { FormEvent, useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Editor } from '@tiptap/react';
import { useToast } from '@chakra-ui/react';
import { ScopedMutator } from 'swr/dist/types';
import { buildToastOptions } from './utils';
import type { Submission } from '../types/common';

async function sendSubmission(content: string) {
  const res = await fetch('/api/submissions', {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  return res;
}

async function mutateAction(
  res: Response,
  content: string,
  mutate: ScopedMutator<Submission[]>
) {
  mutate(
    '/api/submissions',
    async (submissions) => {
      const { insertedId } = await res.json();
      if (!submissions) {
        return [{ id: insertedId, content, createdAt: Date.now() }];
      }
      return [
        ...submissions,
        { id: insertedId, content, createdAt: Date.now() },
      ];
    },
    true
  );
}

export default function useForm(editor: Editor | null) {
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const [formState, setFormState] = useState({
    loading: false,
    error: { message: '' },
  });

  const submitForm = useCallback(
    async (event: FormEvent) => {
      setFormState((prevState) => {
        return { ...prevState, loading: true };
      });
      event.preventDefault();
      const content = editor?.getHTML() ?? '';
      try {
        const res = await sendSubmission(content);
        toast(buildToastOptions(res.status, 'Submit'));
        mutateAction(res, content, mutate);
        editor?.commands.clearContent();
        setFormState((prevState) => {
          return { ...prevState, loading: false };
        });
      } catch (error) {
        setFormState({ loading: false, error: { message: error as string } });
      }
    },
    [editor, mutate, toast]
  );
  return { loading: formState.loading, error: formState.error, submitForm };
}
