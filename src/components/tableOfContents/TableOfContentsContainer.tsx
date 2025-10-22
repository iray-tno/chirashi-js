import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/createStore';
import TableOfContents from './TableOfContents';

type Props = {
    headings?: Array<Queries.Maybe<Queries.MarkdownHeading>> | null,
    className?: string,
    styleName?: string,
};

const TableOfContentsContainer: React.FC<Props> = React.memo((props) => {
    const tableOfContents = useSelector((state: RootState) => {
        return state.tableOfContents;
    });

    const {
        headings,
        className,
    } = props;

    return (
        <TableOfContents
            className={className}
            headings={headings}
            tableOfContents={tableOfContents}
        />
    );
});

export default TableOfContentsContainer;
