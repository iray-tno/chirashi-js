import React from 'react';

import DateDisplay from './DateDisplay';

export default {
    title: 'frontmatter/DateDisplay',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <DateDisplay date="2020-01-01" />
        </div>
    );
};
