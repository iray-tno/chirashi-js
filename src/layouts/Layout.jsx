// @flow
import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

type Props = {
    children: Function,
};

export default class Template extends React.PureComponent<Props> {
    render() {
        const {
            children,
        } = this.props;

        return (
            <React.Fragment>
                <Helmet
                    title="Gatsby Default (Blog) Starter"
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
                                Gatsby Blog
                            </Link>
                        </h1>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </React.Fragment>
        );
    }
}
