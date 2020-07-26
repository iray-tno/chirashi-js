import React, { useCallback } from 'react';
import { InView } from 'react-intersection-observer';

import './headerOne.module.scss';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
    onInViewChange?: (inView: boolean, id: string) => void;
};

const HeaderOne: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
        onInViewChange,
    } = props;

    const handleInViewChange = useCallback((inView: boolean, entry: IntersectionObserverEntry) => {
        if (onInViewChange != null && id != null) {
            onInViewChange(inView, id);
        }
    }, [id]);

    return (
        <InView as="div" onChange={handleInViewChange}>
            <h1
                className={className}
                styleName="headerOne"
                id={id}
            >
                {children}
            </h1>
        </InView>

    );
});

export default HeaderOne;
