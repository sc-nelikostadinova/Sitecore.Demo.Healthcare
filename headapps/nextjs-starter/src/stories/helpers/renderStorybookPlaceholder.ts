import { HtmlElementRendering } from '@sitecore-jss/sitecore-jss-nextjs';

export const renderStorybookPlaceholder = (): HtmlElementRendering => {
  return {
    name: 'div',
    type: 'html',
    contents: `
      <div class="flex justify-center items-center p-4 bg-background border border-dashed border-disabled-dark">
        <div class="flex justify-center items-center w-12 h-12 bg-background-secondary-dark text-foreground-dark rounded-full text-2xl">+</div>
      </div>
    `,
    attributes: {},
  };
};
