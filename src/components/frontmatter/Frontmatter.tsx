import React from 'react';

import DateDisplay from './DateDisplay';
import TagsDisplay from './TagsDisplay';

import './frontmatter.module.css';

type Props = {
    tags?: Queries.Maybe<string>[] | null,
    date: string,
    className?: string,
    styleName?: string,
};

const Frontmatter: React.FC<Props> = React.memo((props) => {
    const {
        className,
        date,
        tags,
    } = props;

    return (
        <div styleName="frontmatter" className={className}>
            <DateDisplay styleName="item" date={date} />
            <TagsDisplay styleName="item" tags={tags} />
        </div>
    );
});

export default Frontmatter;
