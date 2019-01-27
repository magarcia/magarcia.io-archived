import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import '../styles/hightlight.css';

const GITHUB_USERNAME = 'magarcia';
const GITHUB_REPO_NAME = 'blog';

export default ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = get(data, 'site.siteMetadata.title');
  const { previous, next, slug } = pageContext;

  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages${slug}/index.md`;
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://magarcia.github.io${slug}`
  )}`;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.spoiler}
        slug={post.fields.slug}
      />
      <SocialShare title={post.frontmatter.title} url={`https://magarcia.github.io${slug}`} />
      <main>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <small className="info">
            <time dateTime={post.frontmatter.dateRaw}>{formatPostDate(post.frontmatter.date)}</time>{' '}
            &#8208; {formatReadingTime(post.timeToRead)}
          </small>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer>
          <p>
            <a href={discussUrl} target="_blank" rel="noopener noreferrer">
              Discuss on Twitter
            </a>{' '}
            &#8208;{' '}
            <a href={editUrl} target="_blank" rel="noopener noreferrer">
              Edit on GitHub
            </a>
          </p>
        </footer>
        <nav>
          <ul>
            <li>
              {previous && (
                <Link
                  to={`/${previous.frontmatter.date.replace(/-/g, '/')}${previous.fields.slug}`}
                  rel="prev"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={`/${next.frontmatter.date.replace(/-/g, '/')}${next.fields.slug}`}
                  rel="next"
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateRaw: date
        spoiler
      }
      fields {
        slug
      }
    }
  }
`;
