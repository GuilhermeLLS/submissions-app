import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RteForm from './RteForm';

export default {
  title: 'components/RteForm',
  component: RteForm,
} as ComponentMeta<typeof RteForm>;

const Template: ComponentStory<typeof RteForm> = () => <RteForm />;

export const Default = Template.bind({});
