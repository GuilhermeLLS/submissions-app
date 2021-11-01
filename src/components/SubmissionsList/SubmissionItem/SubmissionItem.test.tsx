import { render, screen } from 'utils/test-utils';
import SubmissionItem from './SubmissionItem';
import { parseDate } from 'utils/component-utils';

describe('<SubmissionItem />', () => {
  it('should render component', () => {
    const deleteSubmissionMock = jest.fn();
    render(
      <SubmissionItem
        id="123"
        createdAt={1635690047779}
        deleteSubmissionLoading={false}
        deleteSubmission={deleteSubmissionMock}
      />
    );

    expect(screen.getByText(parseDate(1635690047779))).toBeInTheDocument();
    expect(screen.getByText('🗑️')).toBeInTheDocument();
  });

  it('should render component with loading icon', () => {
    const deleteSubmissionMock = jest.fn();
    render(
      <SubmissionItem
        id="123"
        createdAt={1635690047779}
        deleteSubmissionLoading={true}
        deleteSubmission={deleteSubmissionMock}
      />
    );

    expect(screen.getByText(parseDate(1635690047779))).toBeInTheDocument();
    expect(screen.getByTitle('loading')).toBeInTheDocument();
  });
});
