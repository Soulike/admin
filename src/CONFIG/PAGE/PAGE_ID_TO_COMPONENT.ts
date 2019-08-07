import {PAGE_ID} from './PAGE_ID';
import React from 'react';

const Login = React.lazy(() => import('../../Page/Login'));

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.LOGIN]: Login,

    [PAGE_ID.MANAGE.INDEX]: undefined,

    [PAGE_ID.MANAGE.BLOG.INDEX]: undefined,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]: undefined,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]: undefined,
    [PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]: undefined,

    [PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]: undefined,
    [PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]: undefined,
};