import React from 'react';
import RehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import { ArticlePageQuery } from '../../types/graphqlTypes';

import DefaultLayout from '../components/layout/DefaultLayout';
import ArticleTitle from '../components/article/ArticleTitle';

import {
    HeaderOneContainer,
    HeaderTwoContainer,
    HeaderThreeContainer,
    HeaderFourContainer,
    HeaderFiveContainer,
    HeaderSixContainer,
} from '../components/article/headers/headerContainers';
import InlineCode from '../components/article/InlineCode';
import Frontmatter from '../components/frontmatter/Frontmatter';

type Props = {
    data: ArticlePageQuery,
};

// FIXME#167: Have to fix those type errors.
const renderAst = new RehypeReact({
    createElement: React.createElement as any,
    components: {
        h1: HeaderOneContainer as any,
        h2: HeaderTwoContainer as any,
        h3: HeaderThreeContainer as any,
        h4: HeaderFourContainer as any,
        h5: HeaderFiveContainer as any,
        h6: HeaderSixContainer as any,
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
    const headings = post?.headings;
    if (slug == null || title == null || date == null) return null;

    return (
        <DefaultLayout headings={headings}>
            <div>
                <ArticleTitle to={slug}>{title}</ArticleTitle>
                <Frontmatter date={date} tags={post?.frontmatter?.tags} />
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
        </DefaultLayout>
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
            headings {
                id
                value
                depth
            }
        }
    }
`;
