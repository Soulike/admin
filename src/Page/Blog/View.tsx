import React from 'react';
import Style from './Style.module.scss';
import svg from '../../Static/Blog/macbook.svg';

function BlogView()
{
    return (
        <div className={Style.Blog}>
            <img className={Style.image} src={svg} alt="manage_index" />
        </div>
    );
}

export default React.memo(BlogView);