import React from 'react';

import InlineCode from './InlineCode';

export default {
    title: 'article/InlineCode',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <InlineCode>code sample</InlineCode>
        </div>
    );
};
