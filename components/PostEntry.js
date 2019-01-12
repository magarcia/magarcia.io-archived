import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
import remark from 'remark';
import remarkReact from 'remark-react';
import MetaInfo from './MetaInfo';
import Content from './Content';
import css from './PostEntry.module.css';

const PostLink = ({ year, month, day, slug, title, intro, readingTime }) => {
  const date = moment(new Date(year, month - 1, day)).format('YYYY/MM/DD');
  return (
    <li className={css.li}>
      <Link
        as={`/${date}/${slug}`}
        href={`/post?id=${slug}&year=${year}&month=${month}&day=${day}`}
      >
        <a className={css.titleLink}>
          <h2>{title}</h2>
        </a>
      </Link>
      <div className={css.summary}>
        <Content small>
          {
            remark()
              .use(remarkReact)
              .processSync(intro).contents
          }
        </Content>
      </div>
      <MetaInfo {...{ year, month, day, readingTime }} small />
    </li>
  );
};

PostLink.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired
};

export default PostLink;
