import { Fragment } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Flex, Text, Button, Spinner } from '@chakra-ui/react';
import useForm from '../../hooks/useForm';
import RichTextEditor from '../RichTextEditor/RichTextEditor';

export default function RteForm() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write something! 🤠' }),
    ],
  });
  const { loading, submitForm } = useForm(editor);

  return (
    <form onSubmit={submitForm}>
      <Flex
        my={3}
        p={[2, 5]}
        borderRadius="lg"
        direction="column"
        border="1px solid black"
      >
        <RichTextEditor editor={editor} />
      </Flex>
      <Flex>
        <Button d="flex" w="xs" type="submit" colorScheme="blue">
          {loading ? (
            <Fragment>
              <Text mr={3}>Loading</Text>
              <Spinner size="sm" />
            </Fragment>
          ) : (
            'Submit'
          )}
        </Button>
      </Flex>
    </form>
  );
}
