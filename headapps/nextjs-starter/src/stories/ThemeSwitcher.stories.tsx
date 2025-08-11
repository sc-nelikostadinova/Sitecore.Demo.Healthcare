import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default } from '../components/ThemeSwitcher';
import { ComponentProps } from 'react';
import { expect } from 'storybook/test';

type StoryProps = ComponentProps<typeof Default>;

const meta = {
  title: 'Utilities/Theme Switcher',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    themes: {
      disable: true,
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    const button = canvas.getByRole('button');
    await step('Initial Theme Selection', async () => {
      const storedTheme = sessionStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (!storedTheme) {
        expect(document.body.classList.contains('dark')).toBe(prefersDark);
      } else {
        if (storedTheme === 'dark') {
          expect(document.body.classList.contains('dark')).toBe(true);
        } else {
          expect(document.body.classList.contains('dark')).toBe(false);
        }
      }
    });
    await step('User Theme Selection', async () => {
      const isInitialDarkMode = document.body.classList.contains('dark');
      await userEvent.click(button);
      expect(document.body.classList.contains('dark')).toBe(!isInitialDarkMode);
      await userEvent.click(button);
      expect(document.body.classList.contains('dark')).toBe(isInitialDarkMode);
    });
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

export const ThemeSwitcher: Story = {};
