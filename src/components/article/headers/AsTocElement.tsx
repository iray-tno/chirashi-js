import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import WithInView from './WithInView';
import tableOfContentsModule from '../../../modules/tableOfContentsModule';

type Props = {
    id?: string,
};

/**
 * Wrapper Component to connect with redux state as a TOC element.
 */
const AsTocElement: React.FC<Props> = React.memo((props) => {
    const dispatch = useDispatch();
    const handleInViewChange = useCallback((inView, id) => {
        // FIXME#201: dummy
        dispatch(tableOfContentsModule.actions.increment());
        console.log(inView, id);
    }, [dispatch]);

    const {
        id,
        children,
    } = props;

    return (
        <WithInView id={id} onInViewChange={handleInViewChange}>
            {children}
        </WithInView>
    );
});

export default AsTocElement;
