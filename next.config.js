const postsFolder = './_posts/';
const fs = require('fs');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCSS = require('./lib/next-css');

const range = size =>
  Array(size)
    .fill(1)
    .map((x, y) => x + y);

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
    exportPathMap: () => {
      // TODO: Refactor or Extract to plugin
      const files = fs.readdirSync(postsFolder);
      const posts = files
        .map(filename => {
          const [year, month, day, ...idParts] = filename.split('-');
          const id = idParts.join('-').replace('.md', '');

          const url = `/${year}/${month}/${day}/${id}`;
          const params = {
            page: '/post',
            query: { year, month, day, id }
          };
          return [url, params];
        })
        .reduce((accu, [url, params]) => ({ ...accu, [url]: params }), {});

      const pages = range(Math.ceil(files.length / 5))
        .map(page => [`/blog/page/${page}`, { page: `/`, query: { page } }])
        .reduce((accu, [url, params]) => ({ ...accu, [url]: params }), {});

      return {
        '/': { page: '/' },
        '/about': { page: '/about' },
        ...posts,
        ...pages
      };
    },
    webpack: config => {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      });

      return config;
    }
  }
);
