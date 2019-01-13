import { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PostEntry } from '../components';
import { listPosts } from '../lib/api';
import { postShape } from '../lib/propTypes';
import css from './index.module.css';

export default class Index extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape(postShape)).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired
  };

  static async getInitialProps(context) {
    return listPosts(context.query);
  }

  render() {
    const { results, page, total } = this.props;
    return (
      <>
        <ul className={css.list}>
          {results.map(post => (
            <PostEntry key={post.id} {...post} />
          ))}
        </ul>
        <Pagination total={total} page={page} />
      </>
    );
  }
}
