import React from 'react';
import renderer from 'react-test-renderer';
import SocialShare from './SocialShare';

it('renders correctly', () => {
  const props = {
    title: 'title',
    url: 'http://example.com'
  };
  const tree = renderer.create(<SocialShare {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
