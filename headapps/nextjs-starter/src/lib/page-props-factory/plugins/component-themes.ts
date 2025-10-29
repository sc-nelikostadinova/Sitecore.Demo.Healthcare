import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import { Plugin } from '..';

class ComponentThemesPlugin implements Plugin {
  // Make sure to run this plugin after the personalization plugin, since it relies on the layout data
  order = 10;

  async exec(props: SitecorePageProps) {
    // Collect FEAAS, BYOC, SXA component themes

    /*
    props.headLinks.push(
      ...getComponentLibraryStylesheetLinks(
        props.layoutData,
        config.sitecoreEdgeContextId,
        config.sitecoreEdgeUrl
      )
    );
    */

    return props;
  } 
}

export const componentThemesPlugin = new ComponentThemesPlugin();
