import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { GatsbyNode } from 'gatsby';

import parseArticlePath from '../utils/parseArticlePath';
import { MarkdownRemarkConnection } from '../../types/graphqlTypes';

const query = `
    query PagesQuery {
        allMarkdownRemark(filter: { frontmatter: { publish: { ne: false } } }) {
            edges {
                node {
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

type Result = {
    allMarkdownRemark: MarkdownRemarkConnection,
};

/**
 * onCreateNode
 */
export function onCreateNode({ node, getNode, actions }): void {
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

        const [
            date,
            index,
            name,
        ] = parseArticlePath(relativeFilePath);

        createNodeField({ node, name: 'date', value: date });
        createNodeField({ node, name: 'index', value: index });
        createNodeField({ node, name: 'name', value: name });
    }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql<Result>(query);
    if (result.errors) {
        throw result.errors;
    }

    const nodes = result.data.allMarkdownRemark.edges;
    nodes.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/ArticlePage.tsx'),
            context: {
                slug: node.fields.slug,
            },
        });
    });
};
