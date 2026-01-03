import React from 'react';

import TagItem from './TagItem';

export default {
    title: 'frontmatter/TagItem',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <TagItem tag="タグ１" />
        </div>
    );
};
