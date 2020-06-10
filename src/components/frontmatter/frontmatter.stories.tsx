import React from 'react';

import Frontmatter from './Frontmatter';

export default {
    title: 'frontmatter/Frontmatter',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <Frontmatter date="2020-01-01" tags={['Tag1', 'Tag2']} />
        </div>
    );
};
