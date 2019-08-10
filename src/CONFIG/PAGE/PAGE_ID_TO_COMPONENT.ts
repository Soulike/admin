import {PAGE_ID} from './PAGE_ID';
import React from 'react';

const Login = React.lazy(() => import('../../Page/Login'));
const ManageIndex = React.lazy(() => import('../../Component/ManageIndex'));
const BlogIndex = React.lazy(() => import('../../Component/BlogIndex'));
const BlogAdd = React.lazy(() => import('../../Page/Blog/Add'));

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.LOGIN]: Login,

    [PAGE_ID.MANAGE.INDEX]: ManageIndex,

    [PAGE_ID.MANAGE.BLOG.INDEX]: BlogIndex,

    [PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]: BlogAdd,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]: undefined,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]: undefined,

    [PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]: undefined,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]: undefined,
};