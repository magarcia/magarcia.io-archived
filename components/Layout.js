import Header from './Header';
import Footer from './Footer';
import css from './Layout.module.css';

const Layout = props => (
  <>
    <Header />
    <section className={css.body}>
      <div className={css.inner}>{props.children}</div>
    </section>
    <Footer />
  </>
);

export default Layout;
