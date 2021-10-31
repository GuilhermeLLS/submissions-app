import RteForm from './RteForm';
import { render, screen } from 'utils/test-utils';

describe('<RteForm />', () => {
  it('should render component', () => {
    render(<RteForm />);

    expect(
      screen.getByRole('button', { name: 'paragraph' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'bold' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'italic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'strike' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'h1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
