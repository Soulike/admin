import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../CONFIG';
import NotFound from '../Component/NotFound';

export default () =>
{
    return (
        <Switch>
            <Route exact={true}
                   path={PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]}
                   component={PAGE_ID_TO_COMPONENT[PAGE_ID.LOGIN]} />
            <Route render={NotFound} />
        </Switch>
    );
};