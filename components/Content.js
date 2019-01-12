import css from './Content.module.css';
export default ({ children, small = false }) => <div className={css.postContent}>{children}</div>;
