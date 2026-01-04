import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../store/createStore';

const store = createStore();

type GatsbyRootProps = {
    element: React.ReactNode,
};

export default ({ element }: GatsbyRootProps): React.ReactNode => {
    return <Provider store={store}>{element}</Provider>;
};
