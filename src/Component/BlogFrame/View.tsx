import React from 'react';
import Style from './Style.module.scss';
import {Layout, Menu} from 'antd';
import {Link, Location, Outlet} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE, ROUTE_TO_PAGE_ID} from '../../CONFIG/PAGE';
import {
    FileTextFilled,
    InfoCircleOutlined,
    PlusCircleOutlined,
    ProfileOutlined,
    SettingOutlined,
    TagsFilled,
} from '@ant-design/icons';

const {Content, Sider} = Layout;

interface Props
{
    location: Location,
}

function BlogFrameView(props: Props)
{
    const {location} = props;
    return (
        <Layout className={Style.BlogFrame}>
            <Sider width={250} theme={'light'}>
                <Menu theme={'light'}
                      mode={'inline'} selectedKeys={[ROUTE_TO_PAGE_ID[location.pathname]]} items={[
                    {
                        label: (
                            <>
                            <span className={Style.icon}>
                                <FileTextFilled />
                            </span>
                                文章
                            </>
                        ),
                        key: PAGE_ID.MANAGE.BLOG.INDEX,
                        children: [
                            {
                                label: (
                                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.ADD]}>
                                        <span className={Style.icon}>
                                            <PlusCircleOutlined />
                                        </span>
                                        添加
                                    </Link>),
                                key: PAGE_ID.MANAGE.BLOG.ARTICLE.ADD,
                            },
                            {
                                label: (
                                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]}>
                                        <span className={Style.icon}>
                                            <InfoCircleOutlined />
                                        </span>
                                        管理
                                    </Link>),
                                key: PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE,
                            },
                        ],
                    },
                    {
                        label: (
                            <>
                            <span className={Style.icon}>
                            <TagsFilled />
                            </span>
                                文章分类
                            </>
                        ),
                        key: PAGE_ID.MANAGE.BLOG.CATEGORY.INDEX,
                        children: [
                            {
                                label: (
                                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.ADD]}>
                                        <span className={Style.icon}>
                                            <PlusCircleOutlined />
                                        </span>
                                        添加
                                    </Link>),
                                key: PAGE_ID.MANAGE.BLOG.CATEGORY.ADD,
                            },
                            {
                                label: (
                                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE]}>
                                        <span className={Style.icon}>
                                            <InfoCircleOutlined />
                                        </span>
                                        管理
                                    </Link>),
                                key: PAGE_ID.MANAGE.BLOG.CATEGORY.MANAGE,
                            },
                        ],
                    },
                    {
                        label: (
                            <>
                                <span className={Style.icon}>
                                    <SettingOutlined />
                                </span>
                                设置
                            </>),
                        key: PAGE_ID.MANAGE.BLOG.OPTION.INDEX,
                        children: [
                            {
                                label: (
                                    <Link to={PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.OPTION.ABOUT]}>
                                        <span className={Style.icon}>
                                            <ProfileOutlined />
                                        </span>
                                        关于
                                    </Link>
                                ),
                                key: PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.OPTION.ABOUT],
                            },
                        ],
                    },
                ]} />
            </Sider>
            <Content className={Style.content}>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default React.memo(BlogFrameView);