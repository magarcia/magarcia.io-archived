import React from 'react';
import { Link } from 'gatsby';

class Layout extends React.Component {
  renderHeader() {
    const { location, title } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line no-undef

    if (location.pathname === rootPath) {
      return (
        <>
          <h1>
            <Link to="/">{title}</Link>
          </h1>
        </>
      );
    }
    return (
      <h3>
        <Link to="/">{title}</Link>
      </h3>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <header className="header">{this.renderHeader()}</header>
        {children}
      </>
    );
  }
}

export default Layout;
