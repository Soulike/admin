import React from 'react';
import Style from './Style.module.scss';
import svg from '../../Static/Manage/network_2.svg';

function ManageView()
{
    return (
        <div className={Style.Manage}>
            <img className={Style.image} src={svg} alt="manage_index" />
        </div>
    );
}

export default React.memo(ManageView);