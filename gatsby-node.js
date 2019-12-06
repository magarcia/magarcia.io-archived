const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const tagTemplate = path.resolve('src/templates/tag.js');
    resolve(
      graphql(
        `
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              filter: { frontmatter: { draft: { ne: true } } }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    directoryName
                  }
                  frontmatter {
                    title
                    date
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMdx.edges;

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          const date = _.get(post, 'node.frontmatter.date').replace(/-/g, '/');
          createPage({
            path: date + post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              date: _.get(post, 'node.frontmatter.date'),
              previous,
              next
            }
          });
        });

        // Tag pages:
        let tags = [];
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags);
          }
        });
        // Eliminate duplicate tags
        tags = _.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${tag
              .toLowerCase()
              .split(' ')
              .join('-')}/`,
            component: tagTemplate,
            context: {
              tag
            }
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (_.get(node, 'internal.type') === `Mdx`) {
    createNodeField({
      node,
      name: 'slug',
      value: `/${path.basename(path.dirname(_.get(node, 'fileAbsolutePath')))}`
    });
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath')))
    });
  }
};
