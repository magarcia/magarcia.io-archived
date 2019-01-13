import matter from 'gray-matter';
import readingTime from 'reading-time';
import { removeExtension, basename, origin } from './utils';

const formatPost = (id, contents) => {
  const frontmatter = matter(contents);
  const [year, month, day, ...slugParts] = id.split('-');
  const slug = slugParts.join('-');
  const { title, ...metadata } = frontmatter.data;
  return {
    id,
    slug,
    title,
    content: frontmatter.content,
    metadata: {
      ...metadata,
      readingTime: readingTime(frontmatter.content).text,
      intro: frontmatter.content.split('\n\n')[0],
      date: `${year}-${month}-${day}`,
      url: `${origin()}/${year}/${month}/${day}/${slug}`
    }
  };
};

export default () => {
  const context = require.context('../_posts', true, /\.md$/);
  return {
    list: () =>
      context
        .keys()
        .map(basename)
        .map(removeExtension)
        .sort(),
    get: name => formatPost(name, context(`./${name}.md`))
  };
};
