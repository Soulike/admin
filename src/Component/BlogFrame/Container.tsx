import React from 'react';
import View from './View';
import {useLocation} from 'react-router-dom';

export function BlogFrame()
{
    const location = useLocation();

    return (<View location={location} />);
}