import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import './dateDisplay.module.css';

type Props = {
    date: string,
    className?: string,
    styleName?: string,
};

const DateDisplay: React.FC<Props> = React.memo((props) => {
    return (
        <div className={props.className}>
            <span styleName="icon">
                <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
            <span styleName="text">{props.date}</span>
        </div>
    );
});

export default DateDisplay;
