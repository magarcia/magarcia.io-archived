import { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../components/Pagination';
import PostEntry from '../components/PostEntry';
import { paginate, getFileInfo } from '../lib';
import css from './index.module.css';

export default class Index extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired
  };

  static async getInitialProps(context) {
    // TODO: Refactor
    const page = parseInt(context.query.page, 10) || 1;
    const limit = 5;
    const posts = (ctx => {
      const files = ctx
        .keys()
        .map(f => f.replace('./', '').replace('.md', ''))
        .sort();
      const contents = ctx.keys().map(ctx);
      const results = paginate(files.map((f, i) => [f, contents[i]]).reverse(), page, limit).map(
        ([f, c]) => getFileInfo(f, c)
      );
      return {
        page,
        limit,
        total: Math.ceil(files.length / limit),
        results
      };
    })(require.context('../_posts', true, /\.md$/));
    return {
      ...posts
    };
  }

  render() {
    const { results, page, total } = this.props;
    return (
      <>
        <ul className={css.list}>
          {results.map(props => (
            <PostEntry key={props.id} {...props} />
          ))}
        </ul>
        <Pagination total={total} page={page} />
      </>
    );
  }
}
