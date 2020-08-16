import React from 'react';
import WithInView from './WithInVIew';

import './headerOne.module.scss';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
    onInViewChange?: (inView: boolean, id: string) => void,
};

const HeaderOne: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
        onInViewChange,
    } = props;

    return (
        <WithInView id={id} onInViewChange={onInViewChange}>
            <h1
                className={className}
                styleName="headerOne"
                id={id}
            >
                {children}
            </h1>
        </WithInView>
    );
});

export default HeaderOne;
