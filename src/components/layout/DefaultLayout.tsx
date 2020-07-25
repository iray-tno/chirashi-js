import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../header/Header';
import ContentBox from './ContentBox';
import TableOfContents from '../tableOfContents/TableOfContents';

import { Maybe, MarkdownHeading } from '../../../types/graphqlTypes';

import './defaultLayout.module.scss';

type Props = {
    headings?: Array<Maybe<MarkdownHeading>> | null,
};

const DefaultLayout: React.FC<Props> = (props) => {
    const {
        children,
        headings,
    } = props;

    return (
        <React.Fragment>
            <Helmet
                title="Chiranoura"
                meta={[
                    { name: 'description', content: 'Sample' },
                    { name: 'keywords', content: 'sample, something' },
                ]}
            />
            <Header />
            <div styleName="mainPane">
                <div styleName="leftPane">
                    {headings != null ? <TableOfContents headings={headings} /> : null}
                </div>
                <ContentBox>
                    {children}
                </ContentBox>
            </div>
        </React.Fragment>
    );
};

export default DefaultLayout;
