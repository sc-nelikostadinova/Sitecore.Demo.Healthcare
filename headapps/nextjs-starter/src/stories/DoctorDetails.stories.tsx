import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default } from '../components/DoctorDetails';
import { ComponentProps } from 'react';
import { CommonParams } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { createImageField, createRichTextField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Default> & BackgroundColorArgs;

const meta = {
  title: 'Doctors/Doctor Details',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
  },
  args: {
    ...defaultBackgroundColorArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseFields = {
  FullName: createTextField('Jane Doe'),
  JobTitle: createTextField('Cardiologist'),
  Photo: createImageField(),
  Bio: createRichTextField(3),
};

const baseParams = CommonParams;

export const DoctorDetails: Story = {
  render: (args) => {
    return (
      <Default
        fields={baseFields}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};
