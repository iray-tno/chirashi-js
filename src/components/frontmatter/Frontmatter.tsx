import React from 'react';

import { Maybe } from '../../../types/graphqlTypes';

import DateDisplay from './DateDisplay';
import TagsDisplay from './TagsDisplay';

import './frontmatter.module.scss';

type Props = {
    tags?: Maybe<string>[] | null,
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
