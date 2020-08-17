import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tableOfContentsModule = createSlice({
    name: 'tableOfContent',
    initialState: {
        items: {} as {
            [id: string]: {
                isInView: boolean,
            },
        },
    },
    reducers: {
        updateItem: (draftState, action: PayloadAction<{ id: string, inView: boolean }>) => {
            const {
                id,
                inView,
            } = action.payload;

            if (draftState?.items[id] == null) {
                draftState.items[id] = {
                    isInView: inView,
                };
            } else {
                draftState.items[id].isInView = inView;
            }
            return draftState;
        },
    },
});

export default tableOfContentsModule;

export type TableOfContentActions = typeof tableOfContentsModule.actions;
export type TableOfContentState = ReturnType<typeof tableOfContentsModule.reducer>;
