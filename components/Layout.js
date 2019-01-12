import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import css from './Layout.module.css';

const Layout = ({ children }) => (
  <>
    <Header />
    <section className={css.body}>
      <div className={css.inner}>{children}</div>
    </section>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Layout;
