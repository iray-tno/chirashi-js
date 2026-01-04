import React from 'react';
import PageTitle from './PageTitle';

import './header.module.css';

type Props = {
};

/**
 * The header of the page
 */
const Header: React.FC<Props> = React.memo(() => {
    return (
        <div styleName="header">
            <div styleName="headerInner">
                <PageTitle />
            </div>
        </div>
    );
});

export default Header;
