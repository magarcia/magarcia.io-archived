import React from 'react';
import renderer from 'react-test-renderer';
import About from './about';

it('renders correctly', () => {
  const tree = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});
