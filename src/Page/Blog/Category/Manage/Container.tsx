import React, {PureComponent} from 'react';
import View from './View';
import {Category} from '../../../../Class';
import {TagProps} from 'antd/lib/tag';
import {ModalProps} from 'antd/lib/modal';
import {deleteCategoryById, getAllArticleAmountByCategoryId, getAllCategory} from '../../../../Api/Blog/Category';
import {NativeButtonProps} from 'antd/lib/button/button';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {message, notification} from 'antd';

interface Props {}

interface State
{
    categoryMap: Map<number, Category>,
    categoryToArticleNumberMap: Map<number, number>,

    isArticleListModalVisible: boolean,
    categoryIdOfArticleListModal: number,

    idOfCategoryToDelete: number,
}

class Manage extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            categoryMap: new Map<number, Category>(),
            categoryToArticleNumberMap: new Map<number, number>(),
            isArticleListModalVisible: false,
            categoryIdOfArticleListModal: 0,

            idOfCategoryToDelete: 0,
        };
    }

    componentDidMount()
    {
        Promise.all([
            getAllCategory(),
            getAllArticleAmountByCategoryId(),
        ])
            .then(([categoryList, articleAmountOfCategory]) =>
            {
                if (categoryList !== null && articleAmountOfCategory !== null)
                {
                    const categoryMap: Map<number, Category> = new Map<number, Category>();
                    const categoryToArticleNumberMap = new Map<number, number>();
                    categoryList.forEach(category =>
                    {
                        categoryMap.set(category.id!, category);
                    });
                    Object.keys(articleAmountOfCategory).forEach(idString =>
                    {
                        const id = Number.parseInt(idString);
                        categoryToArticleNumberMap.set(id, articleAmountOfCategory[id]);
                    });
                    this.setState({
                        categoryMap,
                        categoryToArticleNumberMap,
                    });
                }
            });
    }

    onArticleAmountTagClick: (id: number) => TagProps['onClick'] = (id: number) =>
    {
        return e =>
        {
            e.preventDefault();
            this.setState({
                categoryIdOfArticleListModal: id,
                isArticleListModalVisible: true,
            });
        };
    };

    onArticleListModalOk: ModalProps['onOk'] = e =>
    {
        e.preventDefault();
        this.setState({
            isArticleListModalVisible: false,
        });
    };

    onDeleteCategoryButtonClick: (id: number) => NativeButtonProps['onClick'] = id =>
    {
        return () =>
        {
            this.setState({idOfCategoryToDelete: id});
        };
    };

    onDeleteCategoryConfirm: PopconfirmProps['onConfirm'] = async () =>
    {
        const {idOfCategoryToDelete, categoryMap, categoryToArticleNumberMap} = this.state;
        if (categoryToArticleNumberMap.get(idOfCategoryToDelete)! !== 0)
        {
            message.warning('不能删除有文章的分类');
        }
        else
        {
            const result = await deleteCategoryById(idOfCategoryToDelete);
            if (result !== null)
            {
                notification.success({
                    message: '删除文章分类成功',
                });

                categoryMap.delete(idOfCategoryToDelete);
                categoryToArticleNumberMap.delete(idOfCategoryToDelete);
                this.forceUpdate();
            }
        }
    };

    render()
    {
        const {categoryMap, categoryToArticleNumberMap, isArticleListModalVisible, categoryIdOfArticleListModal} = this.state;
        return (<View categoryMap={categoryMap}
                      categoryToArticleNumberMap={categoryToArticleNumberMap}
                      isArticleListModalVisible={isArticleListModalVisible}
                      categoryIdOfArticleListModal={categoryIdOfArticleListModal}
                      onArticleAmountTagClick={this.onArticleAmountTagClick}
                      onArticleListModalOk={this.onArticleListModalOk}
                      onArticleListModalCancel={this.onArticleListModalOk}
                      onDeleteCategoryButtonClick={this.onDeleteCategoryButtonClick}
                      onDeleteCategoryConfirm={this.onDeleteCategoryConfirm} />);
    }
}

export default Manage;