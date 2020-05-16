import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';
import ArticlePreview from '../layouts/ArticlePreview';
import { IndexQuery } from '../../types/graphqlTypes';

type Props = {
    data: IndexQuery,
};

const Index: React.FC<Props> = React.memo((props) => {
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
});

export default Index;

export const query = graphql`
    query Index {
        allMarkdownRemark(
            sort: { order: DESC, fields: [fields___date] }
            filter: { frontmatter: { publish: { ne:false } } }
            limit: 6
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