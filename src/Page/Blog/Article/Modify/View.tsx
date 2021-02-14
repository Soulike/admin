import React from 'react';
import Style from './Style.module.scss';
import {Category} from '../../../../Class';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {SelectProps} from 'antd/lib/select';
import {CheckboxProps} from 'antd/lib/checkbox';
import {NativeButtonProps} from 'antd/lib/button/button';
import ArticleEditor from '../../../../Component/ArticleEditor';
import {ButtonProps} from 'antd';

interface Props
{
    title: string,
    content: string,
    category: number | undefined,
    isVisible: boolean,
    categoryOption: Array<Category>,
    onTitleInputChange: InputProps['onChange'],
    onContentTextAreaChange: TextAreaProps['onChange'],
    onCategorySelectorChange: SelectProps<number>['onChange'],
    onIsVisibleCheckboxChange: CheckboxProps['onChange'],
    onSubmitButtonClick: NativeButtonProps['onClick'],
    isLoadingCategory: boolean,
    isSubmittingArticle: boolean,
    isLoadingArticle: boolean,
    onArticlePreviewButtonClick: NativeButtonProps['onClick'],
    isArticlePreviewModalVisible: boolean,
    onArticlePreviewModalOk: ButtonProps['onClick'],
    onArticlePreviewModalCancel: ButtonProps['onClick'],
    HTMLContent: string,
}

function ModifyView(props: Props)
{
    return (
        <div className={Style.Modify}>
            <ArticleEditor {...props} />
        </div>);
}

export default React.memo(ModifyView);