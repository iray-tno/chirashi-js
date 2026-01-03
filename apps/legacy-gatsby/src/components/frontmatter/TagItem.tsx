import React from 'react';
import { Link } from 'gatsby';

import parseTag from '../../gatsbyNode/parseTag';

import './tagItem.module.css';

type Props = {
    tag: string,
    className?: string,
    styleName?: string,
};

const TagItem: React.FC<Props> = React.memo((props) => {
    const {
        tag: originalTag,
        className,
    } = props;

    const {
        tagName,
        tagId,
    } = parseTag(originalTag);

    return (
        <span className={className} styleName="tagItem">
            <span styleName="name">
                <Link to={`/tags/${tagId}`}>{tagName}</Link>
            </span>
        </span>
    );
});

export default TagItem;
