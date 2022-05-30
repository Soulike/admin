import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../CONFIG/PAGE';
import {LoginRouter} from './LoginRouter';
import {ManageRouter} from './ManageRouter';
import NotFound from '../Component/NotFound';

const Frame = React.lazy(() => import('../Component/Frame'));

export function Router()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]}>
                    {LoginRouter}
                </Route>
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]} element={<Frame />}>
                    {ManageRouter}
                </Route>
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}