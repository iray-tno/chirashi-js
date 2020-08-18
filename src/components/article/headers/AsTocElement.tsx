import React, { useCallback, useEffect } from 'react';
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
    const {
        id,
        children,
    } = props;

    const dispatch = useDispatch();

    const handleInViewChange = useCallback((inView, targetId) => {
        dispatch(tableOfContentsModule.actions.updateItem({ id: targetId, inView }));
    }, [dispatch]);

    useEffect(() => {
        return function willUnmount() {
            if (id == null) return;
            dispatch(tableOfContentsModule.actions.updateItem({ id, inView: false }));
        };
    }, [dispatch, id]);

    return (
        <WithInView id={id} onInViewChange={handleInViewChange}>
            {children}
        </WithInView>
    );
});

export default AsTocElement;
