import React from 'react';
import RehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import { ArticlePageQuery } from '../../types/graphqlTypes';

import Layout from '../layouts/Layout';
import ArticleTitle from '../components/article/ArticleTitle';
import HeaderOne from '../components/article/HeaderOne';
import InlineCode from '../components/article/InlineCode';
import DateDisplay from '../components/frontmatter/DateDisplay';
import TagsDisplay from '../components/frontmatter/TagsDisplay';

type Props = {
    data: ArticlePageQuery,
};

// FIXME#167: Have to fix those type errors.
const renderAst = new RehypeReact({
    createElement: React.createElement as any,
    components: {
        h1: HeaderOne as any,
        code: (props): any => {
            const { className } = props;
            return className == null ? <InlineCode {...props} /> : <span {...props} />;
        },
    },
}).Compiler;

const ArticlePage: React.FC<Props> = (props) => {
    const {
        data,
    } = props;

    const post = data.markdownRemark;

    const slug = post?.fields?.slug;
    const title = post?.frontmatter?.title;
    const date = post?.fields?.date;
    if (slug == null || title == null || date == null) return null;

    return (
        <Layout>
            <div>
                <ArticleTitle to={slug}>{title}</ArticleTitle>
                <DateDisplay date={date} />
                <TagsDisplay tags={post?.frontmatter?.tags} />
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
                tags
            }
            fields {
                date
                slug
            }
        }
    }
`;
