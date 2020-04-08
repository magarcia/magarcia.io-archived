import React from 'react';
import renderer from 'react-test-renderer';
import Layout from './Layout';

it('renders correctly root path', () => {
  const props = {
    location: {
      pathname: `${__PATH_PREFIX__}/`, // eslint-disable-line no-undef
    },
    title: 'title',
  };
  const tree = renderer
    .create(
      <Layout {...props}>
        <div>content</div>
      </Layout>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly non root path', () => {
  const props = {
    location: {
      pathname: `${__PATH_PREFIX__}/post`, // eslint-disable-line no-undef
    },
    title: 'title',
  };
  const tree = renderer
    .create(
      <Layout {...props}>
        <div>content</div>
      </Layout>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
