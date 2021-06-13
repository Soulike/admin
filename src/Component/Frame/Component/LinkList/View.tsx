import React from 'react';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG';
import {Link} from 'react-router-dom';
import Style from './Style.module.scss';

function LinkListView()
{
    return (
        <div className={Style.LinkList}>
            <div className={Style.linkItem}>
                <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}>博客</Link>
            </div>
        </div>);
}

export default React.memo(LinkListView);