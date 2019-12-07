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
      resolve: 'gatsby-plugin-draft',
      options: {
        publishDraft: process.env.NODE_ENV !== 'production'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              withWebp: true,
              linkImagesToOriginal: false,
              tracedSVG: true,
              //   showCaptions: true,
              markdownCaptions: true,
              quality: 80
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: `<svg
              className="feather feather-hash"
              height="22"
              width="22"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" strokeLinecap="round" strokeWidth="2">
                <path d="M4 9h16" />
                <path d="M4 15h16" />
                <path d="M10 3L8 21" />
                <path d="M16 3l-2 18" />
              </g>
            </svg>`
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
              //   showLineNumbers: true,
              languageExtensions: [
                {
                  language: 'yumml',
                  extend: 'yaml',
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ]
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
      resolve: `gatsby-plugin-feed-mdx`,
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
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(edge => {
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
                  date: edge.node.frontmatter.date,
                  author: 'Martin Garcia',
                  language: 'en',
                  url,
                  guid: url,
                  categories: edge.node.frontmatter.tags,
                  custom_elements: [{ 'content:encoded': html + postText }]
                };
              }),
            query: `
              {
                allMdx(
                  limit: 1000,
                  filter: {frontmatter: {draft: {ne: true}}},
                  sort: { order: DESC, fields: [frontmatter___date] }
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
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'magarcia.io'
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
    `gatsby-plugin-react-helmet`
  ]
};
