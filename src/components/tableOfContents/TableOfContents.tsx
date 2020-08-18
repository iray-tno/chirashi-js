import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Maybe, MarkdownHeading } from '../../../types/graphqlTypes';
import { RootState } from '../../store/createStore';

import './tableOfContents.module.scss';

type Props = {
    headings?: Array<Maybe<MarkdownHeading>> | null,
    className?: string,
    styleName?: string,
};

const TableOfContents: React.FC<Props> = React.memo((props) => {
    const tableOfContents = useSelector((state: RootState) => {
        return state.tableOfContents;
    });

    const { lastItemId } = tableOfContents;
    if (props.headings == null) return null;
    return (
        <div className={props.className}>
            {props.headings.map((headerItem) => {
                if (headerItem?.id == null) return null;

                const isInView = tableOfContents.items[headerItem.id]?.isInView;
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
