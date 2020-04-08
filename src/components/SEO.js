import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import profilePic from '../assets/profile-pic.jpg';

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`;

function SEO({ meta, image, title, description, slug, date, lang = 'en' }) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const metaImage = image
          ? `${siteMetadata.siteUrl}/${image}`
          : `${siteMetadata.siteUrl}${profilePic}`;
        const url = `${siteMetadata.siteUrl}${slug}`;
        const schemaOrgJSONLD = [
          {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            url: siteMetadata.siteUrl,
            name: title,
            alternateName: siteMetadata.title || '',
          },
        ];
        if (title) {
          schemaOrgJSONLD.push(
            {
              '@context': 'http://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@id': url,
                    name: title,
                    image,
                  },
                },
              ],
            },
            {
              '@context': 'http://schema.org',
              '@type': 'BlogPosting',
              url,
              name: title,
              alternateName: siteMetadata.title || '',
              headline: title,
              image: {
                '@type': 'ImageObject',
                url: metaImage,
              },
              datePublished: date,
              author: {
                '@type': 'Person',
                name: data.site.author,
                email: 'contact@magarcia.io',
              },
              publisher: {
                '@type': 'Person',
                name: data.site.author,
                email: 'contact@magarcia.io',
              },
              description: metaDescription,
            }
          );
        }
        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s — ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: `${siteMetadata.title} — A blog by Martin Garcia`,
                })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:site_name',
                content: siteMetadata.title,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                property: 'og:type',
                content: title ? 'article' : 'blog',
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:image',
                content: metaImage,
              },
              {
                property: 'og:locale',
                content: 'en_GB',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteMetadata.social.twitter,
              },
              {
                name: 'twitter:site',
                content: siteMetadata.social.twitter,
              },
              {
                name: 'twitter:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'twitter:image',
                content: metaImage,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ].concat(meta)}
          >
            <link rel="canonical" href={url} />
            <link rel="home" href={siteMetadata.siteUrl} />
            {/* Schema.org tags */}
            <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: '',
  slug: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.any,
};

export default SEO;
