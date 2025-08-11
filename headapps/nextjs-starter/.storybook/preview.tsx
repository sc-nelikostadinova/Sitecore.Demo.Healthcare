import type { Preview } from '@storybook/nextjs-vite';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { componentBuilder } from './mockData/mockComponentBuilder';
import { mockLayoutData } from './mockData/mockLayoutData';

import './fonts.css';
import '../src/assets/globals.css';

import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    layout: 'fullscreen',
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => {
      return (
        <SitecoreContext
          componentFactory={componentBuilder.getComponentFactory({
            isEditing: false,
          })}
          layoutData={mockLayoutData}
        >
          <Story />
        </SitecoreContext>
      );
    },
  ],

  argTypes: {
    fields: { table: { disable: true }, control: false },
    params: { table: { disable: true }, control: false },
    rendering: { table: { disable: true }, control: false },
  },
};

export default preview;
