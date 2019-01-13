import PropTypes from 'prop-types';

export const postMetadataShape = {
  intro: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export const postShape = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  metadata: PropTypes.shape(postMetadataShape).isRequired
};

export const childrenShape = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);
