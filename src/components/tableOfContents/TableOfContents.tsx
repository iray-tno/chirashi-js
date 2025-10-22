import React from 'react';
import classNames from 'classnames';

import { TableOfContentsState } from '../../modules/tableOfContentsModule';

import './tableOfContents.module.scss';

type Props = {
    headings?: Array<Queries.Maybe<Queries.MarkdownHeading>> | null,
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

    if (headings == null) return null;

    const lastItemId = tableOfContents == null ? null : tableOfContents.lastItemId;
    const minDepth = headings.reduce((currentValue, item) => {
        if (item?.depth == null) return currentValue;
        return currentValue == null ? item.depth : Math.min(item.depth, currentValue);
    }, 6);

    return (
        <div className={className} styleName="outer">
            {headings.map((headerItem) => {
                if (headerItem?.id == null) return null;

                const isInView = tableOfContents?.items[headerItem.id]?.isInView;
                const itemRelariveDepth = (headerItem.depth || minDepth) - minDepth + 1;

                const itemClassNames = classNames({
                    item: true,
                    active: isInView || lastItemId === headerItem.id,
                    depthOne: itemRelariveDepth === 1,
                    depthTwo: itemRelariveDepth === 2,
                    depthThree: itemRelariveDepth === 3,
                    depthFour: itemRelariveDepth === 4,
                    depthFive: itemRelariveDepth === 5,
                    depthSix: itemRelariveDepth === 6,
                });

                return (
                    <li key={headerItem.id} styleName={itemClassNames}>
                        <a styleName="link" href={`#${headerItem.id}`}>
                            {headerItem.value}
                        </a>
                    </li>
                );
            })}
        </div>
    );
});

export default TableOfContents;
