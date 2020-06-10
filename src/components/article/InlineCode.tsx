import React from 'react';

import './inlineCode.module.scss';

type Props = {
    className?: string,
    styleName?: string,
};

const InlineCode: React.FC<Props> = React.memo((props) => {
    return (
        <span className={props.className} styleName="inlineCode">
            {props.children}
        </span>
    );
});

export default InlineCode;
