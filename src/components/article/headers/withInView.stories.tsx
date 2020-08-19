import React from 'react';
import { action } from '@storybook/addon-actions';

import WithInView from './WithInView';

export default {
    title: 'article/utils/WithInView',
};

export const inViewCallbackSample: React.ReactNode = () => {
    return (
        <div>
            <div style={{ height: '101vh' }} />
            <WithInView id="title_a" onInViewChange={action('inViewChange')}>Title Sample</WithInView>
            <div style={{ height: '101vh' }} />
        </div>
    );
};
