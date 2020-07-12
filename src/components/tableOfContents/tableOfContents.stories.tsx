import React from 'react';

import TableOfContents from './TableOfContents';

export default {
    title: 'tableOfContents/TableOfContents',
};

export const defaultView: React.ReactNode = () => {
    return (
        <TableOfContents headings={
            [
                {
                    id: null,
                    value: 'hoge',
                    depth: 4,
                },
                {
                    id: null,
                    value: 'fuga',
                    depth: 4,
                },
                {
                    id: null,
                    value: '日本語のテスト',
                    depth: 4,
                },
            ]
        }
        />
    );
};
