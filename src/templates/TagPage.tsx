import React from 'react';
import { graphql } from 'gatsby';

import DefaultLayout from '../components/layout/DefaultLayout';
import ArticlePreview from '../components/articlePreview/ArticlePreview';
import { IndexQuery } from '../../types/graphqlTypes';

type Props = {
    pageContext: {// FIXME#323: Add better type
        tag: string,
    },
};

const Index: React.FC<Props> = React.memo((props) => {
    return (
        <DefaultLayout>
            <div className="blog-posts">
                {props.pageContext.tag}
            </div>
        </DefaultLayout>
    );
});

export default Index;

// FIXME#323: Add query for article list
// export const query = graphql`
//     query Index {
//         allMarkdownRemark(
//             sort: { order: DESC, fields: [fields___date] }
//             filter: { frontmatter: { publish: { ne: false } } }
//             limit: 6
//         ) {
//             edges {
//                 node {
//                     excerpt(pruneLength: 250)
//                     id
//                     frontmatter {
//                         title
//                         tags
//                         publish
//                     }
//                     fields {
//                         slug
//                         date
//                         index
//                         name
//                     }
//                 }
//             }
//         }
//     }
// `;
