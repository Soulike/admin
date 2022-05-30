import React from 'react';
import {Route} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../CONFIG/PAGE';

const Component = PAGE_ID_TO_COMPONENT[PAGE_ID.LOGIN];

export const LoginRouter = (
    <>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]}
               element={<Component />} />
    </>);