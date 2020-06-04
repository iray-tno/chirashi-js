import React from 'react';
import RehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import { ArticlePageQuery } from '../../types/graphqlTypes';

import Layout from '../layouts/Layout';
import ArticleTitle from '../components/article/ArticleTitle';
import HeaderOne from '../components/article/HeaderOne';

type Props = {
    data: ArticlePageQuery,
};

// FIXME#167: Have to fix those type errors.
const renderAst = new RehypeReact({
    createElement: React.createElement as any,
    components: {
        h1: HeaderOne as any,
    },
}).Compiler;

const ArticlePage: React.FC<Props> = (props) => {
    const {
        data,
    } = props;

    const post = data.markdownRemark;
    const slug = post?.fields?.slug;
    const title = post?.frontmatter?.title;
    if (slug == null || title == null) return null;

    return (
        <Layout>
            <div>
                <ArticleTitle to={slug}>{title}</ArticleTitle>
                <div>
                    <span>Date:</span>
                    <span>{post?.fields?.date}</span>
                </div>
                <div>
                    <span>Author:</span>
                    <span>{post?.frontmatter?.author}</span>
                </div>
                <div>
                    <span>Category:</span>
                    <span>{post?.frontmatter?.category}</span>
                </div>
                <div>
                    <span>Tags:</span>
                    <span>
                        {post?.frontmatter?.tags?.map((tag) => {
                            return <span>{tag}</span>;
                        })}
                    </span>
                </div>
                {renderAst(post?.htmlAst)}
            </div>
            <div>
                <DiscussionEmbed
                    shortname="chiranoura"
                    config={{
                        title,
                        identifier: slug,
                        url: `http://chiraoura.nobody.jp${slug}`,
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
            htmlAst
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
