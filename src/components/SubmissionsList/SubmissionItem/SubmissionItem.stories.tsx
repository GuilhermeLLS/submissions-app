import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubmissionItem from './SubmissionItem';

export default {
  title: 'components/SubmissionItem',
  component: SubmissionItem,
} as ComponentMeta<typeof SubmissionItem>;

const Template: ComponentStory<typeof SubmissionItem> = (args) => (
  <SubmissionItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: '123',
  createdAt: 1635690047779,
  deleteSubmissionLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteSubmission: () => {},
};

export const Loading = Template.bind({});
Loading.args = {
  id: '123',
  createdAt: 1635690047779,
  deleteSubmissionLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteSubmission: () => {},
};
