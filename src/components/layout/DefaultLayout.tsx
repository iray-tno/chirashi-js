import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../header/Header';
import TableOfContentsContainer from '../tableOfContents/TableOfContentsContainer';

import './defaultLayout.module.css';

type Props = {
    headings?: Array<Queries.Maybe<Queries.MarkdownHeading>> | null,
};

const DefaultLayout: React.FC<Props> = (props) => {
    const {
        children,
        headings,
    } = props;

    return (
        <>
            <Helmet
                title="Chiranoura"
                meta={[
                    { name: 'description', content: 'Sample' },
                    { name: 'keywords', content: 'sample, something' },
                ]}
            />
            <Header />
            <div styleName="outerMainPane">
                <div styleName="sidePane">
                    {headings == null
                        ? null
                        : <TableOfContentsContainer styleName="toc" headings={headings} />}
                </div>
                <div styleName="contentPane">
                    {children}
                </div>
                <div styleName="sidePane" />
            </div>
        </>
    );
};

export default DefaultLayout;
