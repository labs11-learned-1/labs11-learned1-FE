const withCSS = require('@zeit/next-css')
const webpack = require('webpack');
    require('dotenv').config();

    const withAssetRelocator = (nextConfig = {}) => {
      return Object.assign({}, nextConfig, {
        webpack(config, options) {
          const { isServer } = options
    
          if (isServer) {
            config.node = Object.assign({}, config.node, {
              __dirname: false,
              __filename: false,
            })
    
            config.module.rules.unshift({
              test: /\.(m?js|node)$/,
              parser: { amd: false },
              use: {
                loader: '@zeit/webpack-asset-relocator-loader',
                options: {
                  outputAssetBase: 'assets',
                  existingAssetNames: [],
                  wrapperCompatibility: true,
                  escapeNonAnalyzableRequires: true,
                },
              },
            })
          }
    
          if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options)
          }
          return config
        },
      })
    }

    module.exports = withCSS({
      webpack: config => {
        const env = Object.keys(process.env).reduce((acc, curr) => {
          acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
          return acc;
        }, {});

        config.plugins.push(new webpack.DefinePlugin(env));

        return config;
      },
      
      target: 'serverless',
      env: {
        "FIREBASE_KEY": process.env.FIREBASE_KEY,
        "AUTH_DOMAIN": process.env.AUTH_DOMAIN,
        "DATABASE_URL": process.env.DATABASE_URL,
        "PROJECT_ID": process.env.PROJECT_ID,
        "STORAGE_BUCKET": process.env.STORAGE_BUCKET,
        "MESSAGING_SENDER_ID": process.env.MESSAGING_SENDER_ID,
        "UDEMY_CLIENT_ID": process.env.UDEMY_CLIENT_ID,
        "UDEMY_CLIENT_SECRET": process.env.UDEMY_CLIENT_SECRET,
        "ALGOLIA_APP_ID":process.env.ALGOLIA_APP_ID,
        "ALGOLIA_ADMIN_KEY":process.env.ALGOLIA_ADMIN_KEY,
        "ALGOLIA_SEARCH_KEY":process.env.ALGOLIA_SEARCH_KEY,
        "ALGOLIA_INDEX_NAME":process.env.ALGOLIA_INDEX_NAME
      }
      
    });
