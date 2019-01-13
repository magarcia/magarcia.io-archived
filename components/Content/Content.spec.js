import React from 'react';
import renderer from 'react-test-renderer';
import Content from './Content';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Content>
        {'# Header'}
        {'Some markdown content'}
        {'![miskohevery](../static/img/angularbeers-with-misko-hevery.jpg)'}
      </Content>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
