import React from 'react';
import { Link } from 'gatsby';

import { Maybe, MarkdownHeading } from '../../../types/graphqlTypes';

import './tableOfContents.module.scss';

type Props = {
    headings?: Array<Maybe<MarkdownHeading>> | null,
    className?: string,
    styleName?: string,
};

const TableOfContents: React.FC<Props> = React.memo((props) => {
    if (props.headings == null) return null;

    return (
        <div className={props.className}>
            {props.headings.map((headerItem) => {
                if (headerItem?.id == null) return null;

                return (
                    <li key={headerItem.id}>
                        <a href={`#${headerItem.id}`}>
                            {headerItem.value}
                        </a>
                    </li>
                );
            })}
        </div>
    );
});

export default TableOfContents;
