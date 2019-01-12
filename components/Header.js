import Link from 'next/link';
import Gravatar from 'react-gravatar';
import css from './Header.module.css';

const Header = () => (
  <div className={css.bar}>
    <div className={css.content}>
      <div className={css.block}>
        <Link href="/">
          <a>
            <h1 className={css.title}>magarcia</h1>
          </a>
        </Link>
      </div>
      <div className={`${css.block} ${css.right}`}>
        {/* <Link href="/about">
          <a>About</a>
        </Link> */}
        <Gravatar email="newluxfero@gmail.com" className={css.avatar} size={48} />
      </div>
    </div>
  </div>
);

export default Header;
