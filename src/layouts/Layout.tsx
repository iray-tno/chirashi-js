import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

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
            <div>
                <div>
                    <h1>
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            Chiranoura
                        </Link>
                    </h1>
                </div>
            </div>
            <div>
                {children}
            </div>
        </React.Fragment>
    );
};

export default Layout;
