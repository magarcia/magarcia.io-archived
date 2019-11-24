module.exports = {
  siteMetadata: {
    title: 'magarcia',
    author: 'Martin Garcia',
    description: 'A personal blog by Martin Garcia. Thoughts, words, and experiments about code.',
    siteUrl: 'https://magarcia.io',
    social: {
      twitter: '@martinprins'
    }
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              withWebp: true,
              linkImagesToOriginal: false,
              tracedSVG: true
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷'
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-27935483-1`,
        anonymize: true,
        respectDNT: true // respect "Do Not Track"
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge => {
                const { siteUrl } = site.siteMetadata;
                const url = `${siteUrl}/${edge.node.frontmatter.date.replace(/-/g, '/')}${
                  edge.node.fields.slug
                }`;
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at magarcia.io. You can read it online by <a href="${url}">clicking here</a>.)</div>
              `;

                let { html } = edge.node;
                // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                return {
                  ...edge.node.frontmatter,
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.fields.date,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': html + postText }]
                };
              }),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: {fields: { langKey: {eq: "en"}}}
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'magarcia Blog RSS Feed'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `magarcia`,
        short_name: `magarcia`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#faf014`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        useLangKeyLayout: false
      }
    }
  ]
};
