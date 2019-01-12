import matter from 'gray-matter';
import readingTime from 'reading-time';
import visit from 'unist-util-visit';
import Gist from 'react-gist';

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
    readingTime: readingTime(frontmatter.content),
    year,
    month,
    day,
    slug: slugParts.join('-'),
    id
  };
};

export const range = size =>
  Array(size)
    .fill(1)
    .map((x, y) => x + y);

export const gistPlugin = () => {
  function isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  }
  return transformer;

  function transformer(tree) {
    visit(tree, `inlineCode`, node => {
      const { value } = node;

      if (value.startsWith(`gist:`) || value.startsWith(`iframe:`)) {
        const gistUrl = value.substr(5);

        if (isUrlValid(gistUrl)) {
          node.type = `gist`;
          node.value = value;
        }
      }
    });

    return tree;
  }
};

const GistFromUrl = ({ url }) => {
  const props = {
    id: url.split('/')[4].split('.')[0]
  };
  if (url.indexOf('?file=') > -1) {
    props.file = url.split('?file=')[1];
  }
  return <Gist {...props} />;
};

const PElement = ({ children }) => {
  if (!children || children.length <= 0 || typeof children[0] !== 'string') {
    return <p>{children}</p>;
  }

  if (children[0].startsWith('gist:')) {
    return <GistFromUrl url={children[0].replace('gist:', '')} />;
  }

  if (children[0].startsWith('iframe:')) {
    return (
      <iframe
        src={children[0].replace('iframe:', '')}
        frameBorder="0"
        width="736"
        height="443"
        allowFullScreen={true}
      />
    );
  }
  return <p>{children}</p>;
};

export const remarkReactConfig = {
  remarkReactComponents: {
    p: PElement
  }
};
