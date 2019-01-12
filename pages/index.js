import PropTypes from 'prop-types';
import Pagination from '../components/Pagination';
import PostEntry from '../components/PostEntry';
import { paginate, getFileInfo } from '../lib';
import css from './index.module.css';

const App = ({ results, page, total, id }) => (
  <>
    <ul className={css.list}>
      {results.map(props => (
        <PostEntry key={id} {...props} />
      ))}
    </ul>
    <Pagination total={total} page={page} />
  </>
);

App.getInitialProps = async function(context) {
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
};

App.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default App;
