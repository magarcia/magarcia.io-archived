import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from './Pagination';

it('renders correctly', () => {
  const tree = renderer.create(<Pagination total={4} page={2} />).toJSON();
  expect(tree).toMatchSnapshot();
});
