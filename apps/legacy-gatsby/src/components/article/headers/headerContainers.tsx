import React from 'react';

import AsTocElement from './AsTocElement';
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';
import HeaderThree from './HeaderThree';
import HeaderFour from './HeaderFour';
import HeaderFive from './HeaderFive';
import HeaderSix from './HeaderSix';

type Props = {
    className?: string,
    styleName?: string,
    id?: string,
};

export const HeaderOneContainer: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <AsTocElement id={id}>
            <HeaderOne className={className} id={id}>
                {children}
            </HeaderOne>
        </AsTocElement>
    );
});

export const HeaderTwoContainer: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <AsTocElement id={id}>
            <HeaderTwo className={className} id={id}>
                {children}
            </HeaderTwo>
        </AsTocElement>
    );
});

export const HeaderThreeContainer: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <AsTocElement id={id}>
            <HeaderThree className={className} id={id}>
                {children}
            </HeaderThree>
        </AsTocElement>
    );
});

export const HeaderFourContainer: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <AsTocElement id={id}>
            <HeaderFour className={className} id={id}>
                {children}
            </HeaderFour>
        </AsTocElement>
    );
});

export const HeaderFiveContainer: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <AsTocElement id={id}>
            <HeaderFive className={className} id={id}>
                {children}
            </HeaderFive>
        </AsTocElement>
    );
});

export const HeaderSixContainer: React.FC<Props> = React.memo((props) => {
    const {
        className,
        id,
        children,
    } = props;

    return (
        <AsTocElement id={id}>
            <HeaderSix className={className} id={id}>
                {children}
            </HeaderSix>
        </AsTocElement>
    );
});
