import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG';
import ArticleRouter from './SubRouter/ArticleRouter';
import CategoryRouter from './SubRouter/CategoryRouter';
import NotFound from '../../../../Component/NotFound';

export default () =>
{
    return (
        <Switch>
            <Redirect exact={true} path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}
                      to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]} />
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]}
                   component={ArticleRouter} />
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]}
                   component={CategoryRouter} />
            <Route render={NotFound} />
        </Switch>
    );
};