import React from 'react';
import renderer from 'react-test-renderer';
import ErrorPage from './404';

it('renders correctly', () => {
  const props = {
    location: {
      pathname: `/`
    },
    title: 'title'
  };
  const tree = renderer.create(<ErrorPage {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
