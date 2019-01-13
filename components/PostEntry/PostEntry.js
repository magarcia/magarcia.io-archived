import Link from 'next/link';
import moment from 'moment';
import MetaInfo from '../MetaInfo';
import Content from '../Content';
import { postShape } from '../../lib/propTypes';
import css from './PostEntry.module.css';
import { buildQuery } from '../../lib/utils';

const PostLink = ({ metadata, slug, title }) => {
  const date = moment(metadata.date);
  const query = {
    id: slug,
    year: date.format('YYYY'),
    month: date.format('MM'),
    day: date.format('DD')
  };
  return (
    <li className={css.li}>
      <Link as={metadata.url} href={`/post?${buildQuery(query)}`}>
        <a className={css.titleLink}>
          <h2>{title}</h2>
        </a>
      </Link>
      <div className={css.summary}>
        <Content>{metadata.intro}</Content>
      </div>
      <MetaInfo {...metadata} small />
    </li>
  );
};

PostLink.propTypes = postShape;

export default PostLink;
