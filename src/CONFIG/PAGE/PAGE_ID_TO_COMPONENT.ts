import {PAGE_ID} from './PAGE_ID';
import React from 'react';

const Login = React.lazy(() => import('../../Page/Login'));
const Manage = React.lazy(() => import('../../Page/Manage'));
const Blog = React.lazy(() => import('../../Page/Blog'));

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.LOGIN]: Login,

    [PAGE_ID.MANAGE.INDEX]: Manage,

    [PAGE_ID.MANAGE.BLOG.INDEX]: Blog,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]: undefined,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]: undefined,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]: undefined,

    [PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]: undefined,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]: undefined,
};