import React from 'react';
import Style from './Style.module.scss';
import {Article} from '../../../../Class';
import {Button, Icon, List, Switch, Tag, Tooltip} from 'antd';

const {Item} = List;
const {Meta} = Item;
const {Group} = Button;

interface Props
{
    articleList: Array<Article>
}

function ManageView(props: Props)
{
    const {articleList} = props;
    return (
        <div className={Style.Manage}>
            <List dataSource={articleList} bordered={true} pagination={
                {
                    position: 'bottom',
                    pageSizeOptions: ['10', '15', '20'],
                    showSizeChanger: true,

                }
            } renderItem={article =>
            {
                const {id, title, isVisible, publicationTime: publicationTimeString, modificationTime: modificationTimeString} = article;
                const publicationTime = new Date(publicationTimeString!);
                const modificationTime = new Date(modificationTimeString!);
                return (
                    <Item key={id}>
                        <Meta title={
                            <span>{title}</span>
                        } />
                        <Tag>
                            发表：
                            <time>
                                {`${publicationTime.getFullYear()}-${(publicationTime.getMonth() + 1).toString().padStart(2, '0')}-${(publicationTime.getDate()).toString().padStart(2, '0')}`}
                            </time>
                        </Tag>
                        <Tag>
                            编辑：
                            <time>
                                {`${modificationTime.getFullYear()}-${(modificationTime.getMonth() + 1).toString().padStart(2, '0')}-${(modificationTime.getDate()).toString().padStart(2, '0')}`}
                            </time>
                        </Tag>
                        <Tooltip title={'更改文章可见性'}>
                            <Switch className={Style.switch}
                                    checked={isVisible}
                                    checkedChildren={'可见'}
                                    unCheckedChildren={'隐藏'} />
                        </Tooltip>
                        <Group size={'small'} className={Style.buttonWrapper}>
                            <Tooltip title={'编辑文章'}>
                                <Button type={'primary'} ghost={true}>
                                    <Icon type="edit" />
                                </Button>
                            </Tooltip>
                            <Tooltip title={'删除文章'}>
                                <Button type={'danger'} ghost={true}>
                                    <Icon type="delete" />
                                </Button>
                            </Tooltip>
                        </Group>
                    </Item>);
            }} />
        </div>
    )
        ;
}

export default React.memo(ManageView);