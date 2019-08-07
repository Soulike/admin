import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../CONFIG/PAGE';
import LoginRouter from './LoginRouter';
import ManageRouter from './ManageRouter';

export default () =>
{
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact={true} path={'/'} to={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]} />
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]} component={LoginRouter} />
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]} component={ManageRouter} />
            </Switch>
        </BrowserRouter>
    );
};