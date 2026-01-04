import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

import parseArticlePath from './parseArticlePath';

/**
 * onCreateNode
 */
const onCreateNode: GatsbyNode['onCreateNode'] = (args) => {
    const { node, getNode, actions } = args;
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
};

export default onCreateNode;
