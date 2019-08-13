import React from 'react';
import Style from './Style.module.scss';
import {Button, Checkbox, Input, Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';
import {Category} from '../../Class';
import {CheckboxProps} from 'antd/lib/checkbox';
import ArticlePreviewModal from '../../Component/ArticlePreviewModal';

const {Group, TextArea} = Input;
const {Option} = Select;

interface Props
{
    title: string,
    content: string,
    category: number | undefined,
    isVisible: boolean,
    categoryOption: Array<Category>,
    onTitleInputChange: InputProps['onChange'],
    onContentTextAreaChange: TextAreaProps['onChange'],
    onCategorySelectorChange: SelectProps['onChange'],
    onIsVisibleCheckboxChange: CheckboxProps['onChange'],
    onSubmitButtonClick: NativeButtonProps['onClick'],
    isLoadingCategory: boolean,
    isLoadingArticle: boolean,
    isSubmittingArticle: boolean,
    onArticlePreviewButtonClick: NativeButtonProps['onClick'],
    isArticlePreviewModalVisible: boolean,
    HTMLContent: string,
}

function ArticleEditorView(props: Props)
{
    const {
        title,
        content,
        category,
        isVisible,
        categoryOption,
        onTitleInputChange,
        onContentTextAreaChange,
        onCategorySelectorChange,
        onIsVisibleCheckboxChange,
        onSubmitButtonClick,
        isLoadingCategory,
        isSubmittingArticle,
        isLoadingArticle,
        onArticlePreviewButtonClick,
        isArticlePreviewModalVisible,
        HTMLContent,
    } = props;
    return (
        <div className={Style.ArticleEditor}>
            <Group size={'large'} className={Style.inputGroup}>
                <Input disabled={isLoadingCategory || isSubmittingArticle || isLoadingArticle}
                       value={title}
                       onChange={onTitleInputChange}
                       className={Style.title}
                       placeholder={'文章标题'} />
                <TextArea disabled={isLoadingCategory || isSubmittingArticle || isLoadingArticle} value={content}
                          onChange={onContentTextAreaChange}
                          className={Style.content}
                          placeholder={'文章内容（Markdown）'} />
            </Group>
            <div className={Style.bottomWrapper}>
                <Select size={'large'}
                        onChange={onCategorySelectorChange}
                        value={category} loading={isLoadingCategory}
                        className={Style.categorySelect}
                        disabled={isLoadingCategory}
                        placeholder={'文章分类'}>
                    {
                        categoryOption.map(category =>
                        {
                            const {id, name} = category;
                            return <Option value={id} key={id}>{name}</Option>;
                        })
                    }
                </Select>
                <Checkbox disabled={isSubmittingArticle || isLoadingCategory || isLoadingArticle}
                          checked={isVisible}
                          onChange={onIsVisibleCheckboxChange}>公开文章</Checkbox>
                <div className={Style.buttonWrapper}>
                    <Button size={'large'} onClick={onArticlePreviewButtonClick}>预览</Button>
                    <Button loading={isSubmittingArticle}
                            type={'primary'}
                            size={'large'} disabled={isSubmittingArticle || isLoadingCategory || isLoadingArticle}
                            onClick={onSubmitButtonClick}>提交</Button>
                </div>
            </div>
            <ArticlePreviewModal title={title}
                                 HTMLContent={HTMLContent}
                                 visible={isArticlePreviewModalVisible}
                                 onOk={onArticlePreviewButtonClick}
                                 onCancel={onArticlePreviewButtonClick} />
        </div>
    );
}

export default React.memo(ArticleEditorView);