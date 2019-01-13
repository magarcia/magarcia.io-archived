import { withRouter } from 'next/router';
import { Component } from 'react';
import { MetaInfo, Content, SocialShare } from '../components';
import { getPost } from '../lib/api';
import { origin } from '../lib/utils';
import { postShape } from '../lib/propTypes';
import css from './post.module.css';

class Post extends Component {
  static propTypes = postShape;

  static async getInitialProps(context) {
    return getPost(context.query);
  }

  render() {
    const { content, title, metadata } = this.props;
    return (
      <>
        <article className={css.article}>
          <h1 className={css.contentTitle}>{title}</h1>
          <MetaInfo {...metadata} />
          <Content>{content}</Content>
        </article>
        <SocialShare title={title} url={`${origin()}${metadata.url}`} />
      </>
    );
  }
}

export default withRouter(Post);
