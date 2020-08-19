import React from 'react';
import classNames from 'classnames';

import { Maybe, MarkdownHeading } from '../../../types/graphqlTypes';
import { TableOfContentsState } from '../../modules/tableOfContentsModule';

import './tableOfContents.module.scss';

type Props = {
    headings?: Array<Maybe<MarkdownHeading>> | null,
    tableOfContents?: TableOfContentsState | null,
    className?: string,
    styleName?: string,
};

const TableOfContents: React.FC<Props> = React.memo((props) => {
    const {
        headings,
        className,
        tableOfContents,
    } = props;

    const lastItemId = tableOfContents == null ? null : tableOfContents.lastItemId;
    if (headings == null) return null;
    return (
        <div className={className}>
            {headings.map((headerItem) => {
                if (headerItem?.id == null) return null;

                const isInView = tableOfContents?.items[headerItem.id]?.isInView;
                const itemClassNames = classNames({
                    active: isInView || lastItemId === headerItem.id,
                });
                return (
                    <li key={headerItem.id} styleName={itemClassNames}>
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
