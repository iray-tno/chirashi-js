import React from 'react';

import './headerOne.module.css';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
};

const HeaderOne: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <h1
            className={className}
            styleName="headerOne"
            id={id}
        >
            {children}
        </h1>
    );
});

export default HeaderOne;
