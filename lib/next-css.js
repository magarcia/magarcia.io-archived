const cssLoaderConfig = require('@zeit/next-css/css-loader-config');

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const { dev, isServer } = options;
      const { cssLoaderOptions, postcssLoaderOptions } = nextConfig;

      // eslint-disable-next-line no-param-reassign
      options.defaultLoaders.css = cssLoaderConfig(config, {
        extensions: ['css'],
        cssModules: false,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      });

      config.module.rules.push(
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          issuer(issuer) {
            if (issuer.match(/pages[\\/]_document\.js$/)) {
              throw new Error(
                'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
              );
            }
            return true;
          },
          use: options.defaultLoaders.css
        },
        {
          test: /\.module\.css$/,
          use: cssLoaderConfig(config, {
            extensions: ['css'],
            cssModules: true,
            cssLoaderOptions,
            postcssLoaderOptions,
            dev,
            isServer
          })
        }
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
