const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = jssConfig.publicUrl;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: process.env.DEFAULT_LANGUAGE || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en',
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Disable the X-Powered-By header. Follows security best practices.
  poweredByHeader: false,

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edge*.**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'xmc-*.**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'feaas*.blob.core.windows.net',
        port: '',
      },
    ]
  },

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
    ];
  },

  componentPropsPlugin(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      webpack: (config, options) => {
        
        if (!options.isServer) {
          // Add a loader to strip out getServerSideProps and getStaticProps from components in the client bundle
          config.module.rules.unshift({
            test: /src\\components\\.*\.tsx$/,
            use: ['@sitecore-jss\\sitecore-jss-dev-tools\\nextjs-component-props-loader'],
          });
        }

        // Overload the Webpack config if it was already overloaded
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  },

  corsHeaderPlugin(nextConfig = {}) {
    if (!config.sitecoreApiHost) {
      return nextConfig;
    }
    return Object.assign({}, nextConfig, {
      async headers() {
        const extendHeaders =
          typeof nextConfig.headers === 'function' ? await nextConfig.headers() : [];
        return [
          ...(await extendHeaders),
          {
            source: '/_next/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: config.sitecoreApiHost.replace(/\/$/, ''),
              },
            ],
          },
        ];
      },
    });
  },

  feaasPlugin(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      async rewrites() {
        return [
          ...await nextConfig.rewrites(),
          {
            source: '/feaas-render',
            destination: '/api/editing/feaas/render',
          },
        ];
      },
      webpack: (config, options) => {
        if (options.isServer) {
          // Force use of CommonJS on the server for FEAAS SDK since JSS also uses CommonJS entrypoint to FEAAS SDK.
          // This prevents issues arising due to FEAAS SDK's dual CommonJS/ES module support on the server (via conditional exports).
          // See https://nodejs.org/api/packages.html#dual-package-hazard.
          config.externals = [
            {
              '@sitecore-feaas/clientside/react': 'commonjs @sitecore-feaas/clientside/react',
              '@sitecore/byoc': 'commonjs @sitecore/byoc',
              '@sitecore/byoc/react': 'commonjs @sitecore/byoc/react',
            },
            ...config.externals,
          ];
        }

        // Overload the Webpack config if it was already overloaded
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  },

  graphqlPlugin(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      webpack: (config, options) => {
        config.module.rules.push({
          test: /\.graphql$/,
          exclude: /node_modules/,
          use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
        });
      
        config.module.rules.push({
          test: /\.graphqls$/,
          exclude: /node_modules/,
          use: ['graphql-let/schema/loader'],
        });
      
        config.module.rules.push({
          test: /\.ya?ml$/,
          type: 'json',
          use: 'yaml-loader',
        });

        // Overload the Webpack config if it was already overloaded
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      }
    });
  },

  sassPlugin(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
        sassOptions: {
          importer: new SassAlias({
            '@sass': path.join(__dirname, '../../../assets', 'sass'),
            '@fontawesome': path.join(__dirname, '../../../../node_modules', 'font-awesome'),
          }).getImporter(),
          quietDeps: true,
          silenceDeprecations: ["import", "legacy-js-api"],
        },
      });
  },

  robotsPlugin(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      async rewrites() {
        return [
          ...await nextConfig.rewrites(),
          // robots route
          {
            source: '/robots.txt',
            destination: '/api/robots',
          },
        ];
      },
    });
  },

  sitemapPlugin(nextConfig = {}) {
    return Object.assign({}, nextConfig, {
      async rewrites() {
        return [
          ...await nextConfig.rewrites(),
          // sitemap route
          {
            source: '/sitemap:id([\\w-]{0,}).xml',
            destination: '/api/sitemap'
          },
        ];
      },
    });
  }

};

module.exports = nextConfig;