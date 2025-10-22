import React from 'react';
import { Link } from 'gatsby';

import './pageTitle.module.css';

type Props = {
};

/**
 * The title of the page
 */
const PageTitle: React.FC<Props> = React.memo(() => {
    return (
        <h1 styleName="pageTitle">
            <Link to="/">
                <span styleName="pageText">Chiranoura</span>
            </Link>
        </h1>
    );
});

export default PageTitle;
