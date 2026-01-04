import React from 'react';

import ArticleTitle from './ArticleTitle';

export default {
    title: 'article/ArticleTitle',
};

export const defaultView: React.ReactNode = () => {
    return <ArticleTitle to="/">Title Sample</ArticleTitle>;
};
