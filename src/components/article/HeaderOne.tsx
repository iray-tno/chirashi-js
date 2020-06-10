import React from 'react';

import './headerOne.module.scss';

type Props = {
    className?: string,
    styleName?: string,
};

const HeaderOne: React.FC<Props> = React.memo((props) => {
    return (
        <h1 className={props.className} styleName="headerOne">
            {props.children}
        </h1>
    );
});

export default HeaderOne;
