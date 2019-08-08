import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../../../CONFIG';
import ArticleRouter from './SubRouter/ArticleRouter';
import CategoryRouter from './SubRouter/CategoryRouter';
import NotFound from '../../../../Component/NotFound';
import BlogFrame from '../../../../Component/BlogFrame';

export default () =>
{
    return (
        <Switch>
            <BlogFrame>
                <Route exact={true}
                       path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}
                       component={PAGE_ID_TO_COMPONENT[PAGE_ID.MANAGE.BLOG.INDEX]} />
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]}
                       component={ArticleRouter} />
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]}
                       component={CategoryRouter} />
            </BlogFrame>
            <Route render={NotFound} />
        </Switch>
    );
};