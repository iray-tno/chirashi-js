import React from 'react';

import TagsDisplay from './TagsDisplay';

export default {
    title: 'frontmatter/TagsDisplay',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <TagsDisplay tags={['タグ1', 'タグ2(tag2)']} />
        </div>
    );
};

export const noTags: React.ReactNode = () => {
    return (
        <div style={{ padding: '30px' }}>
            <TagsDisplay tags={[]} />
        </div>
    );
};
