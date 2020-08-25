import React from 'react';
import { graphql } from 'gatsby';

import DefaultLayout from '../components/layout/DefaultLayout';
import ArticlePreview from '../components/articlePreview/ArticlePreview';
import { TagArticlesQuery } from '../../types/graphqlTypes';

type Props = {
    pageContext: { // FIXME#323: Add better type
        tagId: string,
        tagName: string,
    },
    data: TagArticlesQuery,
};

const TagPage: React.FC<Props> = React.memo((props) => {
    const { data, pageContext } = props;
    const { edges: posts } = data.allMarkdownRemark;
    const { tagName } = pageContext;

    return (
        <DefaultLayout>
            <div className="blog-posts">
                {tagName}
                {posts.map(({ node: post }) => {
                    const id = post.fields?.slug;
                    return (id == null) ? null : <ArticlePreview post={post} key={id} />;
                })}
            </div>
        </DefaultLayout>
    );
});

export default TagPage;

export const query = graphql`
    query TagArticles($tag: String!) {
        allMarkdownRemark(
            sort: { order: DESC, fields: [fields___date] }
            filter: {
                frontmatter: {
                    publish: { ne: false }
                    tags: { in: [$tag] }
                }
            }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        tags
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
