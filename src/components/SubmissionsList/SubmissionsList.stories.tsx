import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SubmissionsList from './SubmissionsList';

export default {
  title: 'components/SubmissionsList',
  component: SubmissionsList,
} as ComponentMeta<typeof SubmissionsList>;

const Template: ComponentStory<typeof SubmissionsList> = () => (
  <SubmissionsList />
);

export const Default = Template.bind({});
