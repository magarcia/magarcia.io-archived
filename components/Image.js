import PropTypes from 'prop-types';

const ctx = require.context('../static/img', true, /\.(png|jpe?g|svg|webp)$/);

const Image = ({ src: originalSrc, alt: originalAlt }) => {
  const imagePath = originalSrc.replace('../static/img/', './');
  const src = ctx(imagePath);
  const alt = originalAlt;
  const webpPath = imagePath.replace(/\.(png|jpe?g|svg)$/, '.webp');
  const webpSrc = ctx.keys().includes(webpPath) ? ctx(webpPath) : undefined;
  return (
    <picture>
      {webpSrc && <source type="image/webp" srcSet={webpSrc} />}
      <source type="image/jpeg" srcSet={src} />
      <img src={src} alt={alt} />
    </picture>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Image;
