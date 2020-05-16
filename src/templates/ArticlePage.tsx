import React from 'react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import { ArticlePageQuery } from '../../types/graphqlTypes';

import Layout from '../layouts/Layout';

type Props = {
    data: ArticlePageQuery,
};

function createMarkup(data: ArticlePageQuery): { __html: string } {
    return { __html: data.markdownRemark.html };
}

const ArticlePage: React.FC<Props> = (props) => {
    const {
        data,
    } = props;

    const post = data.markdownRemark;
    return (
        <Layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <div>
                    <span>Date:</span>
                    <span>{post.fields.date}</span>
                </div>
                <div>
                    <span>Author:</span>
                    <span>{post.frontmatter.author}</span>
                </div>
                <div>
                    <span>Category:</span>
                    <span>{post.frontmatter.category}</span>
                </div>
                <div>
                    <span>Tags:</span>
                    <span>
                        {post.frontmatter.tags.map((tag) => {
                            return <span>{tag}</span>;
                        })}
                    </span>
                </div>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={createMarkup(data)} />
            </div>
            <div>
                <DiscussionEmbed
                    shortname="chiranoura"
                    config={{
                        title: post.frontmatter.title,
                        identifier: post.fields.slug,
                        url: `http://chiraoura.nobody.jp${post.fields.slug}`,
                    }}
                />
            </div>
        </Layout>
    );
};

export default ArticlePage;

export const query = graphql`
    query ArticlePage($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                author
                category
                tags
            }
            fields {
                date
                slug
            }
        }
    }
`;
