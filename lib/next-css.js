const cssLoaderConfig = require('@zeit/next-css/css-loader-config');

const issuer = file => {
  if (file.match(/pages[\\/]_document\.js$/)) {
    throw new Error(
      'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
    );
  }
  return true;
};

const cssConfig = (config, loaderConfig) => ({
  test: /\.css$/,
  exclude: /\.module\.css$/,
  issuer,
  use: cssLoaderConfig(config, {
    ...loaderConfig,
    cssModules: false
  })
});

const cssModulesConfig = (config, loaderConfig) => ({
  test: /\.module\.css$/,
  issuer,
  use: cssLoaderConfig(config, {
    ...loaderConfig,
    cssModules: true
  })
});

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
      const loaderConfig = {
        extensions: ['css'],
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer
      };

      config.module.rules.push(
        cssConfig(config, loaderConfig),
        cssModulesConfig(config, loaderConfig)
      );

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
