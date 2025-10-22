import React, { useCallback } from 'react';
import { InView } from 'react-intersection-observer';

type Props = {
    id?: string,
    onInViewChange?: (_inViewValue: boolean, _idValue: string) => void,
};

/**
 * Wrapper Component for onInViewChange callback function.
 */
const WithInView: React.FC<Props> = React.memo((props) => {
    const {
        id,
        children,
        onInViewChange,
    } = props;

    const handleInViewChange = useCallback((inView: boolean) => {
        if (onInViewChange != null && id != null) {
            onInViewChange(inView, id);
        }
    }, [id, onInViewChange]);

    return (
        <InView as="div" onChange={handleInViewChange}>
            {children}
        </InView>
    );
});

export default WithInView;
