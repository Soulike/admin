import React from 'react';
import Style from './Style.module.scss';
import {Layout, Menu} from 'antd';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE, ROUTE_TO_PAGE_ID} from '../../CONFIG/PAGE';
import {
    FileTextFilled,
    InfoCircleOutlined,
    PlusCircleOutlined,
    ProfileOutlined,
    SettingOutlined,
    TagsFilled,
} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

interface Props extends RouteComponentProps
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
                      mode={'inline'} selectedKeys={[ROUTE_TO_PAGE_ID[location.pathname]]}>
                    <SubMenu title={
                        <span>
                            <FileTextFilled />
                            文章
                        </span>
                    }>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.ARTICLE.ADD}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]}>
                                <PlusCircleOutlined />
                                添加
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]}>
                                <InfoCircleOutlined />
                                管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title={
                        <span>
                            <TagsFilled />
                            文章分类
                        </span>
                    }>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.CATEGORY.ADD}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]}>
                                <PlusCircleOutlined />
                                添加
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]}>
                                <InfoCircleOutlined />
                                管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title={
                        <span>
                            <SettingOutlined />
                            设置
                        </span>
                    }>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.OPTION.ABOUT}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.OPTION.ABOUT]}>
                                <ProfileOutlined />
                                关于
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