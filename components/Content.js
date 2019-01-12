import PropTypes from 'prop-types';
import css from './Content.module.css';

const Content = ({ children }) => <div className={css.postContent}>{children}</div>;

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Content;
