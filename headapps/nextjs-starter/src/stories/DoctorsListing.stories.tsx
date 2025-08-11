import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default, Slider } from '../components/DoctorsListing';
import { ComponentProps } from 'react';
import { CommonParams } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { createDoctorItems } from './helpers/createItems';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs & {
    numberOfItems: number;
  };

const meta = {
  title: 'Doctors/Doctors Listing',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    numberOfItems: {
      name: 'Number of doctors',
      control: {
        type: 'range',
        min: 1,
        max: 21,
        step: 1,
      },
    },
  },
  args: {
    numberOfItems: 3,
    ...defaultBackgroundColorArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = CommonParams;

export const DoctorsListing: Story = {
  render: (args) => {
    return (
      <Default
        fields={{
          items: createDoctorItems(args.numberOfItems),
        }}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};

export const DoctorsSlider: Story = {
  args: {
    numberOfItems: 7,
  },
  render: (args) => {
    return (
      <Slider
        fields={{
          items: createDoctorItems(args.numberOfItems),
        }}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};
