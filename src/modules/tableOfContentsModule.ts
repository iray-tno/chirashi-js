import { createSlice } from '@reduxjs/toolkit';

const tableOfContentsModule = createSlice({
    name: 'tableOfContent',
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
    },
});

export default tableOfContentsModule;

export type TableOfContentActions = typeof tableOfContentsModule.actions;
export type TableOfContentState = ReturnType<typeof tableOfContentsModule.reducer>;
