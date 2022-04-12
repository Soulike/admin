import React from 'react';
import View from './View';
import {useLocation} from 'react-router-dom';

interface Props
{
    children?: React.ReactNode;
}

export function BlogFrame(props: Props)
{
    const {children} = props;

    const location = useLocation();

    return (<View location={location}>{children}</View>);
}