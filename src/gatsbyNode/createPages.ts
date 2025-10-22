/// <reference path="../gatsby-types.d.ts" />
import path from 'path';
import { GatsbyNode } from 'gatsby';

import parseTag from './parseTag';

const query = `
    query PagesQuery {
        articles: allMarkdownRemark(filter: { frontmatter: { publish: { ne: false } } }) {
            edges {
                node {
                    fields {
                        slug
                    }
                }
            }
        }
        tags: allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___tags) {
                fieldValue
            }
        }
    }
`;

type Result = {
    articles: Queries.MarkdownRemarkConnection,
    tags: {
        group: Array<{ fieldValue: string }>,
    },
}

export type ArticlePageContext = {
    slug: string,
}

export type TagPageContext = {
    tagId: string,
    tagName: string,
    tag: string,
}

type ArticleNode = { node: { fields?: { slug?: string | null } | null } };

/**
 * createPages
 */
const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql<Result>(query);
    if (result.errors) throw result.errors;

    const articleNodes: readonly ArticleNode[] | undefined = result?.data?.articles.edges;
    if (articleNodes == null) return;
    articleNodes.forEach(({ node }: ArticleNode) => {
        const nodePath = node?.fields?.slug;
        if (nodePath == null) throw new Error('node.field.slug should not be nullish');

        createPage<ArticlePageContext>({
            path: nodePath,
            component: path.resolve('./src/templates/ArticlePage.tsx'),
            context: {
                slug: nodePath,
            },
        });
    });

    const tagNodes = result?.data?.tags.group;
    if (tagNodes == null || tagNodes.length === 0) return;
    tagNodes.forEach(({ fieldValue: tag }) => {
        if (tag == null) throw new Error('tag should not be nullish');

        const {
            tagId,
            tagName,
        } = parseTag(tag);

        createPage<TagPageContext>({
            path: `/tags/${tagId}`,
            component: path.resolve('./src/templates/TagPage.tsx'),
            context: {
                tagId,
                tagName,
                tag,
            },
        });
    });
};

export default createPages;
