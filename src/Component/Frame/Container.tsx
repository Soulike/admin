import React from 'react';
import View from './View';
import {NativeButtonProps} from 'antd/lib/button/button';
import {Modal, notification} from 'antd';
import {ModalFuncProps} from 'antd/lib/modal';
import {Account as AccountApi} from '../../Api';
import {useHistory} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';

interface IProps
{
    children?: React.ReactNode
}

function Frame(props: IProps)
{
    const history = useHistory();

    const onExitModalOkButtonClick: ModalFuncProps['onOk'] = async () =>
    {
        await AccountApi.logout();
        notification.success({
            message: '退出成功',
        });
        history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]);
    };

    const onExitButtonClick: NativeButtonProps['onClick'] = e =>
    {
        e.preventDefault();
        Modal.confirm({
            content: '确认退出？',
            onOk: onExitModalOkButtonClick,
        });
    };

    const {children} = props;
    return (<View onExitButtonClick={onExitButtonClick}>{children}</View>);
}

export default React.memo(Frame);