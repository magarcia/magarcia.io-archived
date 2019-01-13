const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCSS = require('./lib/next-css');
const exportPathMap = require('./lib/exportPathMap');

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
          quality: 80
        },
        optipng: {
          optimizationLevel: 3
        },
        pngquant: false,
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3
        },
        svgo: {
          // enable/disable svgo plugins here
        },
        webp: {
          preset: 'default',
          quality: 75
        }
      }
    ],
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]'
        }
      }
    ]
  ],
  {
    exportPathMap,
    webpack: config => {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      });

      return config;
    }
  }
);
