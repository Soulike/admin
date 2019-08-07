import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../../../../CONFIG';
import NotFound from '../../../../../Component/NotFound';

const {ARTICLE} = PAGE_ID.MANAGE.BLOG;

export default () =>
{
    return (
        <Switch>
            {
                Object.values(ARTICLE).map(pageId =>
                {
                    return <Route key={pageId}
                                  path={PAGE_ID_TO_ROUTE[pageId]}
                                  component={PAGE_ID_TO_COMPONENT[pageId]} />;
                })
            }
            <Route render={NotFound} />
        </Switch>
    );
};