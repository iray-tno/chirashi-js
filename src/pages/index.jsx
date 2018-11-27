import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';
import ArticlePreview from '../layouts/ArticlePreview';

export default function Index(props) {
    const { data } = props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
        <Layout {...props}>
            <div className="blog-posts">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => <ArticlePreview post={post} />)}
            </div>
        </Layout>
    );
}

export const query = graphql`
    query IndexQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [fields___date] }
            filter: { frontmatter: { publish: { ne:false } } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        publish
                    }
                    fields {
                        slug
                        date
                        index
                        name
                    }
                }
            }
        }
    }
`;
