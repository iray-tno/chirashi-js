import React from 'react';
import { action } from '@storybook/addon-actions';

import HeaderOne from './HeaderOne';

export default {
    title: 'article/HeaderOne',
};

export const defaultView: React.ReactNode = () => {
    return <HeaderOne>Title Sample</HeaderOne>;
};
