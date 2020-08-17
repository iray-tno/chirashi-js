import React from 'react';
import AsTocElement from './AsTocElement';

import './headerOne.module.scss';

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
        <AsTocElement id={id}>
            <h1
                className={className}
                styleName="headerOne"
                id={id}
            >
                {children}
            </h1>
        </AsTocElement>
    );
});

export default HeaderOne;
