import Link from 'next/link';
import { range } from '../lib';
import css from './Pagination.module.css';

export default ({ total, page }) => (
  <div>
    {range(total).map(val => {
      if (page === val) {
        return (
          <a key={val} className={`${css.page} ${css.active}`}>
            {val}
          </a>
        );
      } else {
        return (
          <Link
            key={val}
            as={val === 1 ? '/' : `/blog/page/${val}`}
            href={val === 1 ? '/' : `/?page=${val}`}
          >
            <a className={css.page}>{val}</a>
          </Link>
        );
      }
    })}
  </div>
);
