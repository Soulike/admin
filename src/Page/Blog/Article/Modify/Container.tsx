import React, {useEffect, useState} from 'react';
import View from './View';
import {useHistory, useLocation} from 'react-router-dom';
import {Category} from '../../../../Class';
import querystring from 'querystring';
import {ButtonProps, message, notification} from 'antd';
import {Blog} from '../../../../Api';
import {NativeButtonProps} from 'antd/lib/button/button';
import {markdownConverter} from '../../../../Singleton';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {SelectProps} from 'antd/lib/select';
import {CheckboxProps} from 'antd/lib/checkbox';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG';

function Modify()
{
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<number | undefined>(undefined);
    const [isVisible, setIsVisible] = useState(true);
    const [categoryOption, setCategoryOption] = useState<Category[]>([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState(false);
    const [isLoadingArticle, setIsLoadingArticle] = useState(false);
    const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);
    const [isArticlePreviewModalVisible, setIsArticlePreviewModalVisible] = useState(false);
    const [HTMLContent, setHTMLContent] = useState('');

    const {search} = useLocation();
    const history = useHistory();

    useEffect(() =>
    {
        // 查询字符串格式为 ?id=xxx
        const {id: idString} = querystring.parse(search.slice(1));
        if (typeof idString !== 'string')
        {
            message.warning('参数不正确');
        }
        else
        {
            const id = Number.parseInt(idString);
            if (Number.isNaN(id))
            {
                message.warning('参数不正确');
            }
            else
            {
                // 获取文章内容
                setId(id);
                setIsLoadingArticle(true);
                Blog.Article.getById(id)
                    .then(article =>
                    {
                        if (article !== null)
                        {
                            const {title, content, category, isVisible} = article;
                            setTitle(title);
                            setContent(content);
                            setCategory(category);
                            setIsVisible(isVisible);
                        }
                    })
                    .finally(() => setIsLoadingArticle(false));
            }
        }
    }, [search]);

    useEffect(() =>
    {
        setIsLoadingCategory(true);
        Blog.Category.getAll()
            .then(categoryList =>
            {
                if (categoryList !== null)
                {
                    setCategoryOption(categoryList);
                }
            })
            .finally(() => setIsLoadingCategory(false));
    }, []);

    const onTitleInputChange: InputProps['onChange'] = e =>
    {
        setTitle(e.target.value);
    };

    const onContentTextAreaChange: TextAreaProps['onChange'] = e =>
    {
        setContent(e.target.value);
    };

    const onCategorySelectorChange: SelectProps<number>['onChange'] = value =>
    {
        setCategory(value); // 在 View 中设置的是 number
    };

    const onIsVisibleCheckboxChange: CheckboxProps['onChange'] = e =>
    {
        setIsVisible(e.target.checked);
    };

    const onArticlePreviewButtonClick: NativeButtonProps['onClick'] = e =>
    {
        e.preventDefault();
        setHTMLContent(markdownConverter.makeHtml(content));
        setIsArticlePreviewModalVisible(true);
    };

    const onArticlePreviewModalOk: ButtonProps['onClick'] = e =>
    {
        e.preventDefault();
        setIsArticlePreviewModalVisible(false);
    };

    const onArticlePreviewModalCancel: ButtonProps['onClick'] = onArticlePreviewModalOk;

    const onSubmitButtonClick: NativeButtonProps['onClick'] = async e =>
    {
        e.preventDefault();
        if (typeof category === 'undefined')
        {
            message.warning('请选择文章分类');
        }
        else if (title.length === 0)
        {
            message.warning('请填写文章标题');
        }
        else if (content.length === 0)
        {
            message.warning('请填写文章内容');
        }
        else
        {
            setIsSubmittingArticle(true);
            const result = await Blog.Article.modify({id, title, content, category, isVisible});
            setIsSubmittingArticle(false);
            if (result !== null)
            {
                notification.success({message: '文章修改成功'});
                history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]);
            }
        }
    };

    return (
        <View title={title}
              content={content}
              category={category}
              categoryOption={categoryOption}
              isLoadingCategory={isLoadingCategory}
              isLoadingArticle={isLoadingArticle}
              isSubmittingArticle={isSubmittingArticle}
              HTMLContent={HTMLContent}
              isVisible={isVisible}
              onArticlePreviewButtonClick={onArticlePreviewButtonClick}
              onArticlePreviewModalOk={onArticlePreviewModalOk}
              onArticlePreviewModalCancel={onArticlePreviewModalCancel}
              isArticlePreviewModalVisible={isArticlePreviewModalVisible}
              onSubmitButtonClick={onSubmitButtonClick}
              onIsVisibleCheckboxChange={onIsVisibleCheckboxChange}
              onCategorySelectorChange={onCategorySelectorChange}
              onContentTextAreaChange={onContentTextAreaChange}
              onTitleInputChange={onTitleInputChange} />);
}

export default React.memo(Modify);