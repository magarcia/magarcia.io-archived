import React from 'react';
import renderer from 'react-test-renderer';
import Image from './Image';

xit('renders correctly', () => {
  const props = {
    src: '../../static/img/angularbeers-with-misko-hevery.jpg',
    alt: 'Alt attribute'
  };
  const tree = renderer.create(<Image {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
