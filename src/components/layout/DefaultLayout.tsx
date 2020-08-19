import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../header/Header';
import TableOfContentsContainer from '../tableOfContents/TableOfContentsContainer';

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
            <div styleName="outerMainPane">
                <div styleName="sidePane">
                    {headings == null
                        ? null
                        : <TableOfContents styleName="toc" headings={headings} />
                    }
                </div>
                <div styleName="contentPane">
                    {children}
                </div>
                <div styleName="sidePane" />
            </div>
        </React.Fragment>
    );
};

export default DefaultLayout;
