import React from 'react';

import './contentBox.module.scss';

type Props = {
};

const ContentBox: React.FC<Props> = (props) => {
    const {
        children,
    } = props;

    return (
        <div styleName="contentBox">
            {children}
        </div>
    );
};

export default ContentBox;
