import React from 'react';
import renderer from 'react-test-renderer';
import Index from './index';

it('renders correctly', () => {
  const post = {
    id: 'id',
    slug: 'slug',
    title: 'title',
    content: 'content of the file',
    metadata: {
      url: 'http://example.com',
      intro: 'this is the intro',
      date: '2019-13-01',
      layout: 'post',
      tags: ['tag1', 'tag2'],
      readingTime: '5 mins'
    }
  };
  const props = { results: [post], total: 1, page: 1 };
  const tree = renderer.create(<Index {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
