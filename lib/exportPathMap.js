const postsFolder = './_posts/';
const fs = require('fs');

const range = size =>
  Array(size)
    .fill(1)
    .map((x, y) => x + y);

const buildPostRoute = filename => {
  const [year, month, day, ...idParts] = filename.split('-');
  const id = idParts.join('-').replace('.md', '');
  return [
    `/${year}/${month}/${day}/${id}`,
    {
      page: '/post',
      query: { year, month, day, id }
    }
  ];
};

const buildPaginationPage = page => [`/blog/page/${page}`, { page: `/`, query: { page } }];

module.exports = () => {
  const files = fs.readdirSync(postsFolder);
  const posts = files
    .map(buildPostRoute)
    .reduce((accu, [url, params]) => ({ ...accu, [url]: params }), {});

  const paginationPages = range(Math.ceil(files.length / 5))
    .map(buildPaginationPage)
    .reduce((accu, [url, params]) => ({ ...accu, [url]: params }), {});

  return {
    '/': { page: '/' },
    '/about': { page: '/about' },
    ...posts,
    ...paginationPages
  };
};
