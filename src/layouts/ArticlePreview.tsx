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

    return (
        <div className="blog-post-preview" key={post.id}>
            <h1 className="title">
                <Link to={post.fields.slug}>
                    {post.frontmatter.title}
                </Link>
            </h1>
            <h2 className="date">
                {post.fields.date}
            </h2>
            <p>
                {post.excerpt}
            </p>
            <Link to={post.fields.slug}>
                Read more
            </Link>
        </div>
    );
});

export default ArticlePreview;
