import React from 'react';
import renderer from 'react-test-renderer';
import Post from './post';

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
  const tree = renderer.create(<Post {...post} />).toJSON();
  expect(tree).toMatchSnapshot();
});
