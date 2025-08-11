import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default } from '../components/Testimonials';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  BlobAccentArgs,
  blobAccentArgTypes,
  defaultBackgroundColorArgs,
  defaultBlobAccentArgs,
} from './common/commonControls';
import { createTestimonialItems } from './helpers/createItems';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createIGQLData } from './helpers/createIGQLData';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs &
  BlobAccentArgs & {
    numberOfItems: number;
  };

const meta = {
  title: 'Page Content/Testimonials',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    ...blobAccentArgTypes,
    numberOfItems: {
      name: 'Number of testimonials',
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
    ...defaultBlobAccentArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = CommonParams;

const baseRendering = {
  ...CommonRendering,
  componentName: 'Testimonials',
  params: CommonParams,
};

export const Testimonials: Story = {
  render: (args) => {
    return (
      <Default
        fields={createIGQLData({
          createItems: createTestimonialItems,
          count: args.numberOfItems,
          topLevelFields: {},
        })}
        params={{
          ...baseParams,
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
        rendering={baseRendering}
      />
    );
  },
};
