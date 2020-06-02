import React from 'react';
import { Link } from 'gatsby';

import HeaderOne from './HeaderOne';

import './articleTitle.module.scss';

type Props = {
    to: string,
    className?: string,
};

const ArticleTitle: React.FC<Props> = React.memo((props) => {
    return (
        <HeaderOne>
            <Link to={props.to}>
                {props.children}
            </Link>
        </HeaderOne>
    );
});

export default ArticleTitle;
