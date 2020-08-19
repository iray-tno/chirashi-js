import React from 'react';

import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';
import HeaderThree from './HeaderThree';
import HeaderFour from './HeaderFour';
import HeaderFive from './HeaderFive';
import HeaderSix from './HeaderSix';

export default {
    title: 'article/headers',
};

export const defaultView: React.ReactNode = () => {
    return (
        <div>
            <HeaderOne>Title Sample</HeaderOne>
            <HeaderTwo>Title Sample</HeaderTwo>
            <HeaderThree>Title Sample</HeaderThree>
            <HeaderFour>Title Sample</HeaderFour>
            <HeaderFive>Title Sample</HeaderFive>
            <HeaderSix>Title Sample</HeaderSix>
        </div>
    );
};
