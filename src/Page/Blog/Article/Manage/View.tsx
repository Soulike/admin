import React from 'react';
import Style from './Style.module.scss';
import ArticleList from '../../../../Component/ArticleList';

function ManageView()
{
    return (
        <div className={Style.Manage}>
            <ArticleList />
        </div>
    );
}

export default React.memo(ManageView);