import { withRouter } from 'next/router';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import remark from 'remark';
import remarkReact from 'remark-react';
import MetaInfo from '../components/MetaInfo';
import Content from '../components/Content';
import { gistPlugin, remarkReactConfig } from '../lib';
import SocialShare from '../components/SocialShare';
import css from './post.module.css';

const Post = ({ content, title, year, month, day, readingTime, slug }) => {
  const url = `https://magarcia.github.io/${year}/${month}/${day}/${slug}`;
  return (
    <>
      <article className={css.article}>
        <h1 className={css.title}>{title}</h1>
        <MetaInfo {...{ year, month, day, readingTime }} />
        <Content>
          {
            remark()
              .use(gistPlugin)
              .use(remarkReact, remarkReactConfig)
              .processSync(content).contents
          }
        </Content>
      </article>
      <SocialShare title={title} url={url} />
    </>
  );
};

Post.getInitialProps = async function(context) {
  const { id, year, month, day } = context.query;
  const post = await import(`../_posts/${year}-${month}-${day}-${id}.md`);
  const document = matter(post.default);

  return {
    slug: id,
    year,
    month,
    day,
    content: document.content,
    readingTime: readingTime(document.content),
    title: document.data.title
  };
};

export default withRouter(Post);
