import Link from 'next/link';
import PropTypes from 'prop-types';
import { range } from '../../lib/utils';
import css from './Pagination.module.css';

const Pagination = ({ total, page }) => (
  <div>
    {range(total).map(val => {
      if (page === val) {
        return (
          <a key={val} className={`${css.page} ${css.active}`}>
            {val}
          </a>
        );
      }
      return (
        <Link
          key={val}
          as={val === 1 ? '/' : `/blog/page/${val}`}
          href={val === 1 ? '/' : `/?page=${val}`}
        >
          <a className={css.page}>{val}</a>
        </Link>
      );
    })}
  </div>
);

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

export default Pagination;
