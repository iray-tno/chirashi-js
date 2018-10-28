// @flow
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';

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
            }
        }
    }
`;
