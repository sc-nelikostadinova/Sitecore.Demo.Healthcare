import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';

export const mockLayoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      pageState: LayoutServicePageState.Normal,
    },
    setContext: () => {
      // nothing
    },
    route: null,
  },
};
