import PropTypes from 'prop-types';
import images from '../../lib/images';

const Image = ({ src, alt }) => {
  const sources = images(src);
  return (
    <picture>
      {sources.types.map(type => (
        <source type={type} key={type} srcSet={sources[type]} />
      ))}
      <img src={sources.original} alt={alt} />
    </picture>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Image;
