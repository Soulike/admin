import React from 'react';
import Style from './Style.module.scss';
import {Button, Card, Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG/PAGE';
import {NativeButtonProps} from 'antd/lib/button/button';

const {Header, Content, Footer} = Layout;

interface Props
{
    children?: React.ReactNode,
    onExitButtonClick: NativeButtonProps['onClick'],
}

function FrameView(props: Props)
{
    const {children, onExitButtonClick} = props;
    return (
        <Layout className={Style.Frame}>
            <Header className={Style.header}>
                <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]}>
                    <div className={Style.iconWrapper}>
                        <Icon type="dashboard" theme="filled" className={Style.icon} />
                        <span className={Style.text}>后台管理</span>
                    </div>
                </Link>
                <Menu theme="dark"
                      mode="horizontal"
                      className={Style.menu} selectable={false}>
                    <Menu.Item>
                        <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.INDEX]}>博客</Link>
                    </Menu.Item>
                </Menu>
                <Button type={'link'}
                        className={Style.exitButton}
                        size={'large'}
                        onClick={onExitButtonClick}>
                    <Icon type="poweroff" />
                    退出登录
                </Button>
            </Header>
            <Layout className={Style.contentLayout}>
                <Content className={Style.content}>
                    <Card className={Style.card} bodyStyle={{height: '100%'}}>
                        {children}
                    </Card>
                </Content>
            </Layout>
            <Footer className={Style.footer}>
                Created By Soulike
            </Footer>
        </Layout>
    );
}

export default React.memo(FrameView);