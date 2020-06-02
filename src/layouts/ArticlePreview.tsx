import React from 'react';
import { Link } from 'gatsby';

import {
    Maybe,
    MarkdownRemark,
    MarkdownRemarkFrontmatter,
    MarkdownRemarkFields,
} from '../../types/graphqlTypes';

import ArticleTitle from '../components/article/ArticleTitle';

type Props = {
    post: Pick<MarkdownRemark, 'excerpt' | 'id'> & {
        frontmatter?: Maybe<Pick<MarkdownRemarkFrontmatter, 'title' | 'publish'>>,
        fields?: Maybe<Pick<MarkdownRemarkFields, 'slug' | 'date' | 'index' | 'name'>>,
    },
};

const ArticlePreview: React.FC<Props> = React.memo((props) => {
    const {
        post,
    } = props;

    const slug = post?.fields?.slug;
    if (slug == null) return null;

    return (
        <div className="blog-post-preview" key={post.id}>
            <ArticleTitle to={slug}>{post?.frontmatter?.title}</ArticleTitle>
            <h2 className="date">
                {post?.fields?.date}
            </h2>
            <p>
                {post.excerpt}
            </p>
            <Link to={slug}>
                Read more
            </Link>
        </div>
    );
});

export default ArticlePreview;
