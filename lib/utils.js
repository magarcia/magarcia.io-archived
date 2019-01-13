import path from 'path';

export const range = size =>
  Array(size)
    .fill(1)
    .map((x, y) => x + y);

export const paginate = (array, page = 1, limit = 5) =>
  array.slice((page - 1) * limit, page * limit);

export const basename = filePath => path.basename(filePath);

export const removeExtension = filename =>
  filename
    .split('.')
    .slice(0, -1)
    .join('.');

export const origin = () =>
  process.browser ? window.location.origin : 'https://magarcia.github.io';

export const buildQuery = query => {
  const str = [];
  for (const q in query)
    if (Object.prototype.hasOwnProperty.call(query, q)) {
      str.push(`${encodeURIComponent(q)}=${encodeURIComponent(query[q])}`);
    }
  return str.join('&');
};
