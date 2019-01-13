import mime from 'mime-types';

const context = require.context('../static/img', true, /\.(png|jpe?g|svg|webp)$/);

const changeFormat = (src, format) => src.replace(/\.(png|jpe?g|svg)$/, `.${format}`);

const buildSources = src => {
  const formats = ['jpg', 'webp', 'png'];
  return formats.reduce((accu, format) => {
    const path = changeFormat(src, format);
    if (context.keys().includes(path)) {
      return { ...accu, [mime.lookup(format)]: context(path) };
    }
    return accu;
  }, {});
};

export default image => {
  const src = image.replace('../static/img/', './');
  const sources = buildSources(src);
  return {
    original: context(src),
    types: Object.keys(sources),
    ...sources
  };
};
