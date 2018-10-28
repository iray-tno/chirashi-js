// @flow
import React from 'react';
import { Link } from 'gatsby';

type Props = {
    post: $FlowFixMe,
};

export default class ArticlePreview extends React.PureComponent<Props> {
    render() {
        const {
            post,
        } = this.props;

        return (
            <div className="blog-post-preview" key={post.id}>
                <h1 className="title">
                    <Link to={post.frontmatter.path}>
                        {post.frontmatter.title}
                    </Link>
                </h1>
                <h2 className="date">
                    {post.frontmatter.date}
                </h2>
                <p>
                    {post.excerpt}
                </p>
                <Link to={post.frontmatter.path}>
                    Read more
                </Link>
            </div>
        );
    }
}
