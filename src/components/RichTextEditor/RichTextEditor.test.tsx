import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { render, screen } from 'utils/test-utils';
import Placeholder from '@tiptap/extension-placeholder';
import RichTextEditor from './RichTextEditor';

const Wrapper = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write something! 🤠' }),
    ],
  });
  return (
    <div>
      <RichTextEditor editor={editor} />
    </div>
  );
};

describe('<RichTextEditor />', () => {
  it('should render component', () => {
    render(<Wrapper />);

    expect(
      screen.getByRole('button', { name: 'paragraph' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'bold' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'italic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'strike' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'h1' })).toBeInTheDocument();
  });
});
