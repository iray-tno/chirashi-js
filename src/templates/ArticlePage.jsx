// @flow
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';

type Props = {
    data: $FlowFixMe,
};

export default class ArticlePage extends React.PureComponent<Props> {
    createMarkup() {
        const {
            data,
        } = this.props;

        return { __html: data.markdownRemark.html };
    }

    render() {
        const {
            data,
        } = this.props;

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
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
            </Layout>
        );
    }
}

export const query = graphql`
    query($slug: String!) {
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
            }
        }
    }
`;
