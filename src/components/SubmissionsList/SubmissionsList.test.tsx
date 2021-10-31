import SubmissionsList from './SubmissionsList';
import { render, screen } from 'utils/test-utils';

describe('<SubmissionsList />', () => {
  it('should render component', () => {
    render(<SubmissionsList />);

    expect(screen.getByText('Submission List')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Click on a submission box to see the details or click on 🗑️ to delete it.'
      )
    ).toBeInTheDocument();
  });
});
