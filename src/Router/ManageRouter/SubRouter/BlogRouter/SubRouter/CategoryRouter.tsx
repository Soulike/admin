import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../../../../CONFIG';

const {CATEGORY} = PAGE_ID.MANAGE.BLOG;

export default () =>
{
    return (
        <Switch>
            {
                Object.values(CATEGORY).map(pageId =>
                {
                    return <Route path={PAGE_ID_TO_ROUTE[pageId]} component={PAGE_ID_TO_COMPONENT[pageId]} />;
                })
            }
        </Switch>
    );
};