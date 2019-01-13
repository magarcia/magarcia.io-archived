import React from 'react';
import renderer from 'react-test-renderer';
import Content from './Content';

jest.mock('../../lib/images');

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Content>
        {'# Header'}
        {'Some markdown content'}
      </Content>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
