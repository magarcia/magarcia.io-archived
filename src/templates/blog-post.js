import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';
import { buildPath, formatPostDate, formatReadingTime } from '../utils/helpers';
import '../styles/hightlight.css';

const GITHUB_USERNAME = 'magarcia';
const GITHUB_REPO_NAME = 'magarcia.io';

export default ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = get(data, 'site.siteMetadata.title');
  const { previous, next, slug, date } = pageContext;
  const url = `https://magarcia.io${buildPath(date, slug)}`;

  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages${slug}index.md`;
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(url)}`;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.spoiler}
        slug={buildPath(date, slug)}
      />
      <main>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <small className="info">
            <time dateTime={post.frontmatter.dateRaw}>{formatPostDate(post.frontmatter.date)}</time>{' '}
            &#8208; {formatReadingTime(post.timeToRead)}
          </small>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <SocialShare title={post.frontmatter.title} url={url} />
        <footer>
          <div className="tags">
            {post.frontmatter.tags.map(tag => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          </div>
          <p>
            <a
              href={discussUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Discuss on Twitter"
            >
              Discuss on Twitter
            </a>{' '}
            &#8208;{' '}
            <a href={editUrl} target="_blank" rel="noopener noreferrer" title="Edit on GitHub">
              Edit on GitHub
            </a>
          </p>
        </footer>
        <nav>
          <ul>
            {[[previous, 'prev'], [next, 'next']].map(([p, rel]) => (
              <li key={rel}>
                {p && (
                  <Link
                    to={buildPath(p.frontmatter.date, p.fields.slug)}
                    rel={rel}
                    title={p.frontmatter.title}
                  >
                    {rel === 'prev' && `← `}
                    {p.frontmatter.title}
                    {rel === 'next' && ` →`}
                  </Link>
                )}
              </li>
            ))}
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
        tags
      }
      fields {
        slug
      }
    }
  }
`;
