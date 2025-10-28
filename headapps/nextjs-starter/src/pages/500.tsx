import { JSX } from 'react';
import Head from 'next/head';
import {
  GraphQLErrorPagesService,
  SitecoreProvider,
  ErrorPages,
} from '@sitecore-content-sdk/nextjs';
import { SitecorePageProps } from 'lib/page-props';
import Layout from 'src/Layout';
import { componentBuilder } from 'temp/componentBuilder';
import { GetStaticProps } from 'next';
import scConfig from 'sitecore.config';
import { siteResolver } from 'lib/site-resolver';
import clientFactory from 'lib/graphql-client-factory';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>500 Internal Server Error</h1>
      <p>There is a problem with the resource you are looking for, and it cannot be displayed.</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

const Custom500 = (props: SitecorePageProps): JSX.Element => {
  if (!(props && props.layoutData)) {
    return <ServerError />;
  }

  return (
    <SitecoreProvider
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={props.layoutData}
    >
      <Layout layoutData={props.layoutData} />
    </SitecoreProvider>
  );
};

export const getStaticProps: GetStaticProps = async (page) => {
  const site = siteResolver.getByName(config.sitecoreSiteName);
  const errorPagesService = new GraphQLErrorPagesService({
    clientFactory,
    siteName: site.name,
    language: page.locale || page.defaultLocale || page.defaultLanguage,
    retries:
      (process.env.GRAPH_QL_SERVICE_RETRIES &&
        parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
      0,
  });
  let resultErrorPages: ErrorPages | null = null;

  if (process.env.DISABLE_SSG_FETCH?.toLowerCase() !== 'true') {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      layoutData: resultErrorPages?.serverErrorPage?.rendered || null,
    },
  };
};

export default Custom500;
