import React from 'react';

import './headerFive.module.css';

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
        <h5
            className={className}
            styleName="headerFive"
            id={id}
        >
            {children}
        </h5>
    );
});

export default HeaderFive;
