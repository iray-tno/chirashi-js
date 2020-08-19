import React from 'react';

import './headerFour.module.scss';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
};

const HeaderFour: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <h4
            className={className}
            styleName="headerFour"
            id={id}
        >
            {children}
        </h4>
    );
});

export default HeaderFour;
