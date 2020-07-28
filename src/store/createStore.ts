import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
    EnhancedStore,
} from '@reduxjs/toolkit';

import tableOfContentsModule from '../modules/tableOfContentsModule';

const rootReducer = combineReducers({
    counter: tableOfContentsModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default (): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware(),
    });
};
