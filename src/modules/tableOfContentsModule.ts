import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tableOfContentsModule = createSlice({
    name: 'tableOfContent',
    initialState: {
        items: {} as {
            [id: string]: {
                isInView: boolean,
            },
        },
        lastItemId: null as string | null,
    },
    reducers: {
        updateItem: (draftState, action: PayloadAction<{ id: string, inView: boolean }>) => {
            const {
                id,
                inView,
            } = action.payload;

            let isInViewPrev = false;
            if (draftState.items[id] == null) {
                draftState.items[id] = {
                    isInView: inView,
                };
            } else {
                isInViewPrev = draftState.items[id].isInView;
                draftState.items[id].isInView = inView;
            }

            if (isInViewPrev === true && inView === false) {
                draftState.lastItemId = id;
            }

            return draftState;
        },
        resetItem: (draftState, action: PayloadAction<{ id: string }>) => {
            const {
                id,
            } = action.payload;

            if (draftState.items[id] == null) {
                draftState.items[id] = {
                    isInView: false,
                };
            } else {
                draftState.items[id].isInView = false;
            }

            if (draftState.lastItemId === id) {
                draftState.lastItemId = null;
            }

            return draftState;
        },
    },
});

export default tableOfContentsModule;

export type TableOfContentsActions = typeof tableOfContentsModule.actions;
export type TableOfContentsState = ReturnType<typeof tableOfContentsModule.reducer>;
