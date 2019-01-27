const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
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
        const posts = result.data.allMarkdownRemark.edges;

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
      })
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath')))
    });
  }
};
