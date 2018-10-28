const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

/**
 * onCreateNode
 */
function onCreateNode({ node, getNode, actions }) {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const relativeFilePath = createFilePath({
            node,
            getNode,
            basePath: 'articles',
        });

        createNodeField({
            node,
            name: 'slug',
            value: `/articles${relativeFilePath}`,
        });
    }
}

function createPages({ graphql, actions }) {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
        graphql(`
            {
                allMarkdownRemark {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
        `).then((result) => {
            result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve('./src/templates/ArticlePage.jsx'),
                    context: {
                        slug: node.fields.slug,
                    },
                });
            });
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
