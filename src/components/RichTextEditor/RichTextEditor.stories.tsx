import * as React from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RichTextEditor from './RichTextEditor';

export default {
  title: 'components/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write something! 🤠' }),
    ],
  });
  return <RichTextEditor editor={editor} />;
};

export const Default = Template.bind({});
