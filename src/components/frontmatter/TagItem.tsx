import React from 'react';

import './tagItem.module.scss';

type Props = {
    tag: string,
    className?: string,
    styleName?: string,
};

const TagItem: React.FC<Props> = React.memo((props) => {
    const originalTag = props.tag;

    const tagName = originalTag;
    return (
        <span className={props.className} styleName="tagItem">
            <span styleName="name">
                {tagName}
            </span>
        </span>
    );
});

export default TagItem;
