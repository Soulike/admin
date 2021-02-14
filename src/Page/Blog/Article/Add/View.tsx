import React from 'react';
import {SelectProps} from 'antd/lib/select';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';
import {Category} from '../../../../Class';
import {CheckboxProps} from 'antd/lib/checkbox';
import ArticleEditor from '../../../../Component/ArticleEditor';
import Style from './Style.module.scss';
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
    onArticlePreviewButtonClick: NativeButtonProps['onClick'],
    isArticlePreviewModalVisible: boolean,
    onArticlePreviewModalOk: ButtonProps['onClick'],
    onArticlePreviewModalCancel: ButtonProps['onClick'],
    HTMLContent: string,
}

function Add(props: Props)
{
    return (
        <div className={Style.Add}>
            <ArticleEditor {...props} isLoadingArticle={false} />
        </div>);
}

export default React.memo(Add);