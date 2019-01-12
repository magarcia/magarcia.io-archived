import { withRouter } from 'next/router';
import { Component } from 'react';
import PropTypes from 'prop-types';
import matter from 'gray-matter';
import getReadingTime from 'reading-time';
import moment from 'moment';
import remark from 'remark';
import reactRender from 'remark-react';
import lowlight from 'remark-react-lowlight';
import githubSchema from 'hast-util-sanitize/lib/github.json';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import MetaInfo from '../components/MetaInfo';
import Content from '../components/Content';
import SocialShare from '../components/SocialShare';
import css from './post.module.css';
import './highlightjs.css';

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [...(githubSchema.attributes.code || []), 'className']
  })
});

class Post extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired
  };

  static async getInitialProps(context) {
    const { id, year, month, day } = context.query;
    const date = moment(new Date(year, month - 1, day)).format('YYYY-MM-DD');
    const post = await import(`../_posts/${date}-${id}.md`);
    const document = matter(post.default);

    return {
      slug: id,
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      content: document.content,
      readingTime: getReadingTime(document.content).text,
      title: document.data.title
    };
  }

  render() {
    const { content, title, year, month, day, readingTime, slug } = this.props;
    const url = `https://magarcia.github.io/${year}/${month}/${day}/${slug}`;
    return (
      <>
        <article className={css.article}>
          <h1 className={css.title}>{title}</h1>
          <MetaInfo {...{ year, month, day, readingTime }} />
          <Content>
            {
              remark()
                .use(reactRender, {
                  sanitize: schema,
                  remarkReactComponents: {
                    code: lowlight({
                      ts,
                      js
                    }),
                    p: ({ children }) => {
                      if (children[0] === '!(') {
                        return (
                          <iframe
                            src={children[1].props.href}
                            title={children[1].props.href}
                            frameBorder="0"
                            width="700"
                            height="394"
                            allowFullScreen
                          />
                        );
                      }
                      return <p>{children}</p>;
                    }
                  }
                })
                .processSync(content).contents
            }
          </Content>
        </article>
        <SocialShare title={title} url={url} />
      </>
    );
  }
}

export default withRouter(Post);
