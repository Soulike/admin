import React from 'react';
import Style from './Style.module.scss';
import {Button, Icon, List, Modal, Popconfirm, Tag, Tooltip} from 'antd';
import {Category} from '../../../../Class';
import ArticleList from '../../../../Component/ArticleList/Container';
import {TagProps} from 'antd/lib/tag';
import {ModalProps} from 'antd/lib/modal';
import {NativeButtonProps} from 'antd/lib/button/button';
import {PopconfirmProps} from 'antd/lib/popconfirm';

const {Item} = List;
const {Meta} = Item;
const {Group} = Button;

interface Props
{
    categoryMap: Map<number, Category>,
    categoryToArticleNumberMap: Map<number, number>,

    isArticleListModalVisible: boolean,
    categoryIdOfArticleListModal: number,
    onArticleAmountTagClick: (id: number) => TagProps['onClick'],
    onArticleListModalOk: ModalProps['onOk'],
    onArticleListModalCancel: ModalProps['onCancel'],

    onDeleteCategoryButtonClick: (id: number) => NativeButtonProps['onClick'],
    onDeleteCategoryConfirm: PopconfirmProps['onConfirm'],
}

function ManageView(props: Props)
{
    const {
        categoryMap,
        categoryToArticleNumberMap,
        categoryIdOfArticleListModal,
        isArticleListModalVisible,
        onArticleAmountTagClick,
        onArticleListModalOk,
        onArticleListModalCancel,
        onDeleteCategoryButtonClick,
        onDeleteCategoryConfirm,
    } = props;

    const categoryInModal = categoryMap.get(categoryIdOfArticleListModal);
    return (
        <div className={Style.Manage}>
            <List dataSource={Array.from(categoryMap.values())} bordered={true} pagination={
                {
                    position: 'bottom',
                    pageSizeOptions: ['5', '10', '15', '20'],
                    showSizeChanger: true,
                    hideOnSinglePage: true,
                }
            } renderItem={({id, name}) =>
            {
                return (
                    <Item>
                        <Meta title={<Tag color={'blue'}>{name}</Tag>} />
                        <Tag onClick={onArticleAmountTagClick(id!)}
                             className={Style.articleAmountTag}>文章：{categoryToArticleNumberMap.get(id!)}</Tag>
                        <Group size={'small'} className={Style.buttonWrapper}>
                            <Tooltip title={'编辑文章分类'}>
                                <Button type={'primary'} ghost={true}>
                                    <Icon type="edit" />
                                </Button>
                            </Tooltip>
                            <Tooltip title={'删除文章分类'}>
                                <Popconfirm title={`确认删除文章分类 "${name}"？`} onConfirm={onDeleteCategoryConfirm}>
                                    <Button type={'danger'} ghost={true} onClick={onDeleteCategoryButtonClick(id!)}>
                                        <Icon type="delete" />
                                    </Button>
                                </Popconfirm>
                            </Tooltip>
                        </Group>
                    </Item>);
            }}>
            </List>
            <Modal title={`分类"${categoryInModal ? categoryInModal.name : ''}"下的文章`}
                   visible={isArticleListModalVisible}
                   width={'80vw'}
                   onOk={onArticleListModalOk}
                   onCancel={onArticleListModalCancel} destroyOnClose={true}>
                <div className={Style.articleListModal}>
                    <ArticleList categoryIdFilter={categoryIdOfArticleListModal} />
                </div>
            </Modal>
        </div>
    );
}

export default ManageView;