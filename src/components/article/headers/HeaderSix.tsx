import React from 'react';

import './headerFive.module.scss';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
};

const HeaderFive: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <h6
            className={className}
            styleName="headerFive"
            id={id}
        >
            {children}
        </h6>
    );
});

export default HeaderFive;
