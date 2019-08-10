import React, {PureComponent} from 'react';
import View from './View';
import {NativeButtonProps} from 'antd/lib/button/button';
import {Modal, notification} from 'antd';
import {ModalFuncProps} from 'antd/lib/modal';
import {logout} from '../../Api/Account';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG/PAGE';

interface Props extends RouteComponentProps
{
    children?: React.ReactNode
}

interface State {}

class Frame extends PureComponent<Props, State>
{
    onExitButtonClick: NativeButtonProps['onClick'] = e =>
    {
        e.preventDefault();
        Modal.confirm({
            content: '确认退出？',
            onOk: this.onExitModalOkButtonClick,
        });
    };

    onExitModalOkButtonClick: ModalFuncProps['onOk'] = async () =>
    {
        await logout();
        notification.success({
            message: '退出成功',
        });
        const {history} = this.props;
        history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.LOGIN]);
    };

    render()
    {
        const {children} = this.props;
        return (<View onExitButtonClick={this.onExitButtonClick}>{children}</View>);
    }
}

export default withRouter(Frame);