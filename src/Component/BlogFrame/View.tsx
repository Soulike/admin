import React from 'react';
import Style from './Style.module.scss';
import {Layout, Menu} from 'antd';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE, ROUTE_TO_PAGE_ID} from '../../CONFIG';
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
                            <span className={Style.icon}>
                                <FileTextFilled />
                            </span>
                            文章
                        </span>
                    } key={PAGE_ID.MANAGE.BLOG.INDEX}>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.ARTICLE.ADD}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]}>
                                <span className={Style.icon}>
                                <PlusCircleOutlined />
                                </span>
                                添加
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]}>
                                <span className={Style.icon}>
                                <InfoCircleOutlined />
                                </span>
                                管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title={
                        <span>
                            <span className={Style.icon}>
                            <TagsFilled />
                            </span>
                            文章分类
                        </span>
                    } key={PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX}>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.CATEGORY.ADD}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]}>
                                <span className={Style.icon}>
                                <PlusCircleOutlined />
                                </span>
                                添加
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]}>
                                <span className={Style.icon}>
                                <InfoCircleOutlined />
                                </span>
                                管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title={
                        <span>
                            <span className={Style.icon}>
                                <SettingOutlined />
                                </span>
                            设置
                        </span>
                    } key={PAGE_ID.MANAGE.BLOG.OPTION.INDEX}>
                        <Menu.Item key={PAGE_ID.MANAGE.BLOG.OPTION.ABOUT}>
                            <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.OPTION.ABOUT]}>
                                <span className={Style.icon}>
                                <ProfileOutlined />
                                </span>
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