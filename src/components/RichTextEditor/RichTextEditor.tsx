import { Fragment } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { Button, HStack, chakra } from '@chakra-ui/react';

const ChakraEditorContent = chakra(EditorContent);

type Props = {
  editor: Editor | null;
};

export default function RichTextEditor({ editor }: Props) {
  if (!editor) return null;
  return (
    <Fragment>
      <MenuBar editor={editor} />
      <ChakraEditorContent
        h="md"
        overflow="auto"
        editor={editor}
        data-testid="text-editor"
      />
    </Fragment>
  );
}

function MenuBar({ editor }: Props) {
  if (!editor) return null;
  return (
    <HStack spacing={[2, 5]} mb={2}>
      <Button
        p={2}
        border="none"
        colorScheme="blue"
        fontSize={['sm', 'md']}
        bg={editor.isActive('bold') ? 'blue.600' : 'blue.300'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        bold
      </Button>
      <Button
        p={2}
        border="none"
        colorScheme="blue"
        fontSize={['sm', 'md']}
        bg={editor.isActive('italic') ? 'blue.600' : 'blue.300'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        italic
      </Button>
      <Button
        p={2}
        border="none"
        colorScheme="blue"
        fontSize={['sm', 'md']}
        bg={editor.isActive('strike') ? 'blue.600' : 'blue.300'}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        strike
      </Button>
      <Button
        p={2}
        border="none"
        colorScheme="blue"
        fontSize={['sm', 'md']}
        bg={editor.isActive('paragraph') ? 'blue.600' : 'blue.300'}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        paragraph
      </Button>
      <Button
        p={2}
        border="none"
        colorScheme="blue"
        fontSize={['sm', 'md']}
        bg={editor.isActive('heading', { level: 1 }) ? 'blue.600' : 'blue.300'}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        h1
      </Button>
    </HStack>
  );
}
