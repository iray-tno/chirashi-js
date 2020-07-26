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
                    id: 'hoge',
                    value: 'hoge',
                    depth: 4,
                },
                {
                    id: 'fuga',
                    value: 'fuga',
                    depth: 4,
                },
                {
                    id: '日本語のテスト',
                    value: '日本語のテスト',
                    depth: 4,
                },
            ]
        }
        />
    );
};
