import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/header/Header';
import ContentBox from '../components/ContentBox';

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
            <ContentBox>
                {children}
            </ContentBox>
        </React.Fragment>
    );
};

export default Layout;
