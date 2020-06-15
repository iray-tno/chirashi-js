import React from 'react';

import ReadMoreLink from './ReadMoreLink';

export default {
    title: 'articlePreview/ReadMoreLink',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <ReadMoreLink to="dummy" />
        </div>
    );
};
