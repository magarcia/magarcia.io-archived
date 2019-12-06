import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { buildPath, formatPostDate, formatReadingTime } from '../utils/helpers';
import Anchor from '../components/icons/anchor';

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;
  const siteTitle = get(data, 'site.siteMetadata.title');
  const posts = get(data, 'allMdx.edges');

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={tagHeader}
        description={`Posts tagged with "GSoC" on magarcia.io`}
        slug={`/tags/${tag
          .toLowerCase()
          .split(' ')
          .join('-')}`}
      />
      <main className="post-list">
        <h2>{tagHeader}</h2>

        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3 style={{ marginBottom: 0, fontSize: '1.5rem', fontWeight: 500 }}>
                <Link to={buildPath(node.frontmatter.dateRaw, node.fields.slug)} title={title}>
                  <div style={{ marginLeft: '-20px', float: 'left' }}>
                    <Anchor height={16} width={16} />
                  </div>
                  {title}
                </Link>
              </h3>
              <small className="info">
                <time dateTime={node.frontmatter.dateRaw}>
                  {formatPostDate(node.frontmatter.date)}
                </time>{' '}
                &#8208; {formatReadingTime(node.timeToRead)}
              </small>
            </div>
          );
        })}
      </main>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 140)
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            dateRaw: date
            title
            spoiler
          }
        }
      }
    }
  }
`;
