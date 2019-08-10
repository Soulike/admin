import React from 'react';
import Style from './Style.module.scss';
import svg from '../../Static/Manage/network_2.svg';

function ManageIndexView()
{
    return (
        <div className={Style.ManageIndex}>
            <img className={Style.image} src={svg} alt="manage_index" />
        </div>
    );
}

export default React.memo(ManageIndexView);