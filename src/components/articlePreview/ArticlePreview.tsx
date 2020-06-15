import React from 'react';

import {
    Maybe,
    MarkdownRemark,
    MarkdownRemarkFrontmatter,
    MarkdownRemarkFields,
} from '../../../types/graphqlTypes';

import ArticleTitle from '../article/ArticleTitle';
import Frontmatter from '../frontmatter/Frontmatter';
import ReadMoreLink from './ReadMoreLink';

type Props = {
    post: Pick<MarkdownRemark, 'excerpt' | 'id'> & {
        frontmatter?: Maybe<Pick<MarkdownRemarkFrontmatter, 'title' | 'publish' | 'tags'>>,
        fields?: Maybe<Pick<MarkdownRemarkFields, 'slug' | 'date' | 'index' | 'name'>>,
    },
};

const ArticlePreview: React.FC<Props> = React.memo((props) => {
    const {
        post,
    } = props;

    const slug = post?.fields?.slug;
    const title = post?.frontmatter?.title;
    const date = post?.fields?.date;
    if (slug == null || title == null || date == null) return null;

    return (
        <div>
            <ArticleTitle to={slug}>{title}</ArticleTitle>
            <Frontmatter date={date} tags={post?.frontmatter?.tags} />
            <p>
                {post.excerpt}
            </p>
            <ReadMoreLink to={slug} />
        </div>
    );
});

export default ArticlePreview;
