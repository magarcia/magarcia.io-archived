import Link from 'next/link';
import remark from 'remark';
import remarkReact from 'remark-react';
import MetaInfo from './MetaInfo';
import Content from './Content';
import css from './PostEntry.module.css';

export default ({ year, month, day, slug, title, intro, readingTime }) => (
  <li className={css.li}>
    <Link
      as={`/${year}/${month}/${day}/${slug}`}
      href={`/post?id=${slug}&year=${year}&month=${month}&day=${day}`}
    >
      <a className={css.titleLink}>
        <h2>{title}</h2>
      </a>
    </Link>
    <div className={css.summary}>
      <Content small={true}>
        {
          remark()
            .use(remarkReact)
            .processSync(intro).contents
        }
      </Content>
    </div>
    <MetaInfo {...{ year, month, day, readingTime }} small={true} />
  </li>
);
