import React from 'react';
import renderer from 'react-test-renderer';
import MetaInfo from './MetaInfo';

it('renders correctly', () => {
  const tree = renderer
    .create(<MetaInfo date="2019-13-01" readingTime="5 mins" small={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when is small', () => {
  const tree = renderer.create(<MetaInfo date="2019-13-01" readingTime="5 mins" small />).toJSON();
  expect(tree).toMatchSnapshot();
});
