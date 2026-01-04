import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';

import tableOfContentsModule from '../modules/tableOfContentsModule';

const rootReducer = combineReducers({
    tableOfContents: tableOfContentsModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
    });
};

export default createStore;
