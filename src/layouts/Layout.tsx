import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/header/Header';

type Props = {
};

const Layout: React.FC<Props> = (props) => {
    const {
        children,
    } = props;

    return (
        <React.Fragment>
            <Helmet
                title="Chiranoura"
                meta={[
                    { name: 'description', content: 'Sample' },
                    { name: 'keywords', content: 'sample, something' },
                ]}
            />
            <Header />
            <div>
                {children}
            </div>
        </React.Fragment>
    );
};

export default Layout;
