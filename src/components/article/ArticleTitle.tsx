import React from 'react';
import { Link } from 'gatsby';

import HeaderOne from './headers/HeaderOne';

import './articleTitle.module.scss';

type Props = {
    to: string,
    className?: string,
    styleName?: string,
};

const ArticleTitle: React.FC<Props> = React.memo((props) => {
    return (
        <HeaderOne>
            <Link to={props.to}>
                <span styleName="headerText">{props.children}</span>
            </Link>
        </HeaderOne>
    );
});

export default ArticleTitle;
