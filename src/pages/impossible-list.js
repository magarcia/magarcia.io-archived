import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

const ImpossibleList = ({ location, data }) => {
  const siteTitle = get(data, 'site.siteMetadata.title');
  const impossiblesGrouped = groupBy(
    get(data, 'allImpossiblesJson.edges').map(e => e.node),
    'type'
  );

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="My Impossible List" />
      <main className="post-list">
        <h1>My Impossible List</h1>

        <p>
          This is my Impossible List. I got the idea from{' '}
          <a
            href="http://collegeinfogeek.com/about/meet-the-author/my-impossible-list/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thomas Frank{' '}
          </a>
          who got it from Joel Runyon. Joel created the{' '}
          <a
            href="http://impossiblehq.com/impossible-list/"
            target="_blank"
            rel="noopener noreferrer"
          >
            world’s first impossible list
          </a>{' '}
          and defined the{' '}
          <a
            href="http://impossiblehq.com/the-impossible-list-is-not-a-bucket-list/"
            target="_blank"
            rel="noopener noreferrer"
          >
            difference
          </a>{' '}
          between it and a bucket list. Here is what he has to say about it:
        </p>
        <blockquote>
          <p>
            The Impossible List is&nbsp;<strong>not&nbsp;</strong>a bucket list.
          </p>
          <p>There’s a difference. Not just in the name, but in the entire concept.</p>
          <p>
            Lots of people have a bucket list. They’re static things made up at one point in
            time&nbsp;that&nbsp;most&nbsp;people&nbsp;don’t end up actually incorporating into their
            lives and discard when things get tough.
          </p>
          <p>
            <em>The impossible list is different.</em>&nbsp;It’s fluid, updating status of what’s
            coming, what’s next and where you’ve come from. It’s always changing, always updating
            and always evolving.&nbsp;The impossible list isn’t just a piece of paper, it’s a
            commentary to yourself on how you’re living.
          </p>
          <p>–&nbsp;Joel Runyon</p>
        </blockquote>
        {Object.entries(impossiblesGrouped).map(([type, impossibles]) => (
          <section key={type}>
            <h2>{type}</h2>
            <ul>
              {impossibles.map(({ id, title, done }) => (
                <li key={id}>{done ? <del>{title}</del> : title}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </Layout>
  );
};

export default ImpossibleList;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allImpossiblesJson {
      edges {
        node {
          id
          title
          type
          done
          focus
        }
      }
    }
  }
`;
