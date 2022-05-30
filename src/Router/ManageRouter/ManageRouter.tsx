import React from 'react';
import {Route} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_ROUTE} from '../../CONFIG/PAGE';
import {BlogRouter} from './SubRouter/BlogRouter';
import BlogFrame from '../../Component/BlogFrame';

const IndexComponent = PAGE_ID_TO_COMPONENT[PAGE_ID.MANAGE.INDEX];

export const ManageRouter = (
    <>
        <Route index={true}
               element={<IndexComponent />} />
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}
               element={<BlogFrame />}>
            {BlogRouter}
        </Route>
    </>);