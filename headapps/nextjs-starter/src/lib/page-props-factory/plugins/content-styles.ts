import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import { getContentStylesheetLink } from '@sitecore-content-sdk/nextjs';
import { Plugin } from '..';
import scConfig from 'sitecore.config';

class ContentStylesPlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps) {
    // Get content stylessheet link, empty if styles are not used on the page
    const contentStyles = getContentStylesheetLink(
      props.layoutData,
      config.sitecoreEdgeContextId,
      config.sitecoreEdgeUrl
    );

    if (contentStyles) props.headLinks.push(contentStyles);

    return props;
  }
}

export const contentStylesPlugin = new ContentStylesPlugin();
