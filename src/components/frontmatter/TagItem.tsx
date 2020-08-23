import React from 'react';
import { Link } from 'gatsby';

import './tagItem.module.scss';

type Props = {
    tag: string,
    className?: string,
    styleName?: string,
};

type Tag = {
    tagName: string,
    tagId: string,
};

function parseTag(tag: string) : Tag {
    const startIndex = tag.indexOf('(');
    const endIndex = tag.indexOf(')');
    if (startIndex < 0 && endIndex < 0) {
        return {
            tagName: tag,
            tagId: tag,
        };
    }

    return {
        tagName: tag.substring(0, startIndex),
        tagId: tag.substring(startIndex + 1, endIndex),
    };
}

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
