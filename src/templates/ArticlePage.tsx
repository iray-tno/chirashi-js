import React from 'react';
import * as prod from 'react/jsx-runtime';
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import type { Root } from 'hast';

import { ArticlePageContext } from '../gatsbyNode/createPages';

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
    pageContext: ArticlePageContext,
    data: Queries.ArticlePageQuery,
};

type CodeProps = {
    className?: string;
    children?: React.ReactNode;
};

// Migrated to rehype-react v8 API
const renderAst = (htmlAst: Root): React.ReactElement | null => {
    const options: RehypeReactOptions = {
        ...prod,
        components: {
            h1: HeaderOneContainer,
            h2: HeaderTwoContainer,
            h3: HeaderThreeContainer,
            h4: HeaderFourContainer,
            h5: HeaderFiveContainer,
            h6: HeaderSixContainer,
            code: (props: CodeProps) => {
                const { className } = props;
                return className == null ? <InlineCode {...props} /> : <span {...props} />;
            },
        },
    };

    const processor = rehypeReact(options);
    return processor.stringify(htmlAst);
};

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
