import React from 'react';
import Style from './Style.module.scss';
import {Icon, Layout, Menu} from 'antd';
import {Link, RouteProps, withRouter} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE, ROUTE_TO_PAGE_ID} from '../../CONFIG/PAGE';

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

interface Props extends RouteProps
{
    children?: React.ReactNode
}

function BlogFrameView(props: Props)
{
    const {children, location} = props;
    return (
        <Layout className={Style.BlogFrame}>
            <Sider width={250} theme={'light'}>
                <Menu theme={'light'}
                      mode={'inline'} selectedKeys={[ROUTE_TO_PAGE_ID[location!.pathname]]}>
                    <SubMenu title={
                        <span>
                            <Icon type="file-text" theme="filled" />
                            文章
                        </span>
                    }>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.ARTICLE.ADD}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]}>
                                <Icon type="plus-circle" />
                                添加
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]}>
                                <Icon type="info-circle" />
                                管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title={
                        <span>
                            <Icon type="tags" theme="filled" />
                            文章分类
                        </span>
                    }>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.CATEGORY.ADD}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]}>
                                <Icon type="plus-circle" />
                                添加
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]}>
                                <Icon type="info-circle" />
                                管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content className={Style.content}>
                {children}
            </Content>
        </Layout>
    );
}

export default React.memo(withRouter(BlogFrameView));