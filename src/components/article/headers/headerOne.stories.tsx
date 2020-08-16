import React from 'react';
import { action } from '@storybook/addon-actions';

import HeaderOne from './HeaderOne';

export default {
    title: 'article/HeaderOne',
};

export const defaultView: React.ReactNode = () => {
    return <HeaderOne>Title Sample</HeaderOne>;
};

export const inViewCallbackSample: React.ReactNode = () => {
    return (
        <div>
            <div style={{ height: '101vh' }} />
            <HeaderOne id="title_a" onInViewChange={action('inViewChange')}>Title Sample</HeaderOne>
            <div style={{ height: '101vh' }} />
        </div>
    );
};
