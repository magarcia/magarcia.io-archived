import matter from 'gray-matter';
import readingTime from 'reading-time';

// TODO: Split in different subfiles in lib
export const paginate = (array, page = 1, limit = 5) =>
  array.slice((page - 1) * limit, page * limit);

export const getFileInfo = (filename, contents, fullContent = false) => {
  const frontmatter = matter(contents);
  const id = filename.replace('./', '').replace('.md', '');
  const [year, month, day, ...slugParts] = id.split('-');
  return {
    ...(fullContent
      ? { content: frontmatter.content }
      : { intro: frontmatter.content.split('\n\n')[0] }),
    title: frontmatter.data.title,
    readingTime: readingTime(frontmatter.content).text,
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    day: parseInt(day, 10),
    slug: slugParts.join('-'),
    id
  };
};

export const range = size =>
  Array(size)
    .fill(1)
    .map((x, y) => x + y);
