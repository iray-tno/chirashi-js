import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { Maybe } from '../../../types/graphqlTypes';

import TagItem from './TagItem';
import './tagsDisplay.module.scss';

type Props = {
    tags?: Maybe<string>[] | null,
    className?: string,
    styleName?: string,
};

const TagsDisplay: React.FC<Props> = React.memo((props) => {
    const {
        className,
        tags,
    } = props;

    return (
        <div className={className}>
            <span styleName="icon">
                <FontAwesomeIcon icon={faTags} />
            </span>
            {tags == null || tags.length === 0
                ? <span styleName="noTags">No tags.</span>
                : tags.map((tag) => {
                    return tag == null ? null : <TagItem tag={tag} key={tag} styleName="item" />;
                })
            }
        </div>
    );
});

export default TagsDisplay;
