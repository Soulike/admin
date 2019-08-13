import {PAGE_ID} from './PAGE_ID';
import React from 'react';

const Login = React.lazy(() => import('../../Page/Login'));
const ManageIndex = React.lazy(() => import('../../Component/ManageIndex'));
const BlogIndex = React.lazy(() => import('../../Component/BlogIndex'));
const ArticleAdd = React.lazy(() => import('../../Page/Blog/Article/Add'));
const CategoryAdd = React.lazy(() => import('../../Page/Blog/Category/Add'));
const ArticleManage = React.lazy(() => import('../../Page/Blog/Article/Manage'));
const ArticleModify = React.lazy(() => import('../../Page/Blog/Article/Modify'));
const CategoryManage = React.lazy(() => import('../../Page/Blog/Category/Manage'));

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.LOGIN]: Login,

    [PAGE_ID.MANAGE.INDEX]: ManageIndex,

    [PAGE_ID.MANAGE.BLOG.INDEX]: BlogIndex,

    [PAGE_ID.MANAGE.BLOG.ARTICLE.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]: ArticleAdd,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]: ArticleManage,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]: ArticleModify,

    [PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX]: BlogIndex,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]: CategoryAdd,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]: CategoryManage,
};