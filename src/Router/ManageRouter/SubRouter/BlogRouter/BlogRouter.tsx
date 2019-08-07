import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG';
import ArticleRouter from './SubRouter/ArticleRouter';
import CategoryRouter from './SubRouter/CategoryRouter';

export default () =>
{
    return (
        <Switch>
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]}
                   component={ArticleRouter} />
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]}
                   component={CategoryRouter} />
        </Switch>
    );
};