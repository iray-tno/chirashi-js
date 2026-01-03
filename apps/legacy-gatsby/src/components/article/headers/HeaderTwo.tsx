import React from 'react';

import './headerTwo.module.css';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
};

const HeaderTwo: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <h2
            className={className}
            styleName="headerTwo"
            id={id}
        >
            {children}
        </h2>
    );
});

export default HeaderTwo;
