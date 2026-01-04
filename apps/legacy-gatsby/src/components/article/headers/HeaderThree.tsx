import React from 'react';

import './headerThree.module.css';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
};

const HeaderThree: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <h3
            className={className}
            styleName="headerThree"
            id={id}
        >
            {children}
        </h3>
    );
});

export default HeaderThree;
