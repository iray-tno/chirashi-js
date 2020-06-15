import React from 'react';
import { Link } from 'gatsby';

import './readMoreLink.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
    className?: string,
    styleName?: string,
    to: string,
};

const ReadMoreLink: React.FC<Props> = React.memo((props) => {
    return (
        <span className={props.className} styleName="readMoreLink">
            <Link to={props.to}>
                <span styleName="text">Read more...</span>
                <FontAwesomeIcon icon={faAngleDoubleRight} styleName="icon" />
            </Link>
        </span>
    );
});

export default ReadMoreLink;
