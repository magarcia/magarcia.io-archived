import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { buildPath, formatPostDate, formatReadingTime } from '../utils/helpers';

const BlogIndex = props => {
  const { data, location } = props;
  const siteTitle = get(data, 'site.siteMetadata.title');
  const posts = get(data, 'allMdx.edges');

  return (
    <Layout location={location} title={siteTitle}>
      <SEO />
      <main className="post-list">
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header>
                <h2>
                  <Link to={buildPath(node.frontmatter.dateRaw, node.fields.slug)} title={title}>
                    {title}
                  </Link>
                </h2>
                <small className="info">
                  <time dateTime={node.frontmatter.dateRaw}>
                    {formatPostDate(node.frontmatter.date)}
                  </time>{' '}
                  &#8208; {formatReadingTime(node.timeToRead)}
                </small>
              </header>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.spoiler || node.excerpt
                }}
              />
            </article>
          );
        })}
      </main>
      <Footer />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
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
