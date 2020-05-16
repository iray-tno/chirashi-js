import React from 'react';
import { Link } from 'gatsby';

import {
    Maybe,
    MarkdownRemark,
    MarkdownRemarkFrontmatter,
    MarkdownRemarkFields,
} from '../../types/graphqlTypes';

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
            <h1 className="title">
                <Link to={slug}>
                    {post?.frontmatter?.title}
                </Link>
            </h1>
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
