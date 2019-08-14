import React, {PureComponent} from 'react';
import View from './View';
import {Category} from '../../../../Class';
import {TagProps} from 'antd/lib/tag';
import {ModalProps} from 'antd/lib/modal';
import {
    deleteCategoryById,
    getAllArticleAmountByCategoryId,
    getAllCategory,
    modifyCategory,
} from '../../../../Api/Blog/Category';
import {NativeButtonProps} from 'antd/lib/button/button';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {message, notification} from 'antd';
import {InputProps} from 'antd/lib/input';

interface Props {}

interface State
{
    categoryMap: Map<number, Category>,
    categoryToArticleNumberMap: Map<number, number>,

    isArticleListModalVisible: boolean,
    categoryIdOfArticleListModal: number,

    isModifyModalVisible: boolean,
    idOfCategoryToModify: number,
    nameOfCategoryToModify: string,

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

            isModifyModalVisible: false,

            idOfCategoryToDelete: 0,
            idOfCategoryToModify: 0,
            nameOfCategoryToModify: '',
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

    onModifyModalOk: ModalProps['onOk'] = async e =>
    {
        e.preventDefault();
        const {idOfCategoryToModify, nameOfCategoryToModify, categoryMap} = this.state;
        if (nameOfCategoryToModify !== null)
        {
            const result = await modifyCategory(new Category(idOfCategoryToModify, nameOfCategoryToModify));
            if (result !== null)
            {
                notification.success({message: '文章分类编辑成功'});
                categoryMap.get(idOfCategoryToModify)!.name = nameOfCategoryToModify;
                this.forceUpdate();
                this.setState({isModifyModalVisible: false});
            }
        }
        else
        {
            message.warning('文章分类名不能为空');
        }
    };

    onModifyModalCancel: ModalProps['onCancel'] = e =>
    {
        e.preventDefault();
        this.setState({isModifyModalVisible: false});
    };

    onModifyButtonClick: (id: number) => NativeButtonProps['onClick'] = id =>
    {
        return () =>
        {
            const {categoryMap} = this.state;
            this.setState({
                idOfCategoryToModify: id,
                nameOfCategoryToModify: categoryMap.get(id)!.name!,
                isModifyModalVisible: true,
            });
        };
    };

    onCategoryNameInputChange: InputProps['onChange'] = e =>
    {
        this.setState({nameOfCategoryToModify: e.target.value});
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
        const {categoryMap, categoryToArticleNumberMap, isArticleListModalVisible, categoryIdOfArticleListModal, isModifyModalVisible, nameOfCategoryToModify} = this.state;
        return (<View categoryMap={categoryMap}
                      categoryToArticleNumberMap={categoryToArticleNumberMap}

                      isArticleListModalVisible={isArticleListModalVisible}
                      categoryIdOfArticleListModal={categoryIdOfArticleListModal}
                      onArticleAmountTagClick={this.onArticleAmountTagClick}
                      onArticleListModalOk={this.onArticleListModalOk}
                      onArticleListModalCancel={this.onArticleListModalOk}

                      onDeleteCategoryButtonClick={this.onDeleteCategoryButtonClick}
                      onDeleteCategoryConfirm={this.onDeleteCategoryConfirm}

                      isModifyModalVisible={isModifyModalVisible}
                      onModifyModalOk={this.onModifyModalOk}
                      onModifyModalCancel={this.onModifyModalCancel}
                      onModifyButtonClick={this.onModifyButtonClick}
                      onCategoryNameInputChange={this.onCategoryNameInputChange}
                      nameOfCategoryToModify={nameOfCategoryToModify} />);
    }
}

export default Manage;