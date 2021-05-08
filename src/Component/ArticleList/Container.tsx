import React, {DOMAttributes, useEffect, useState} from 'react';
import View from './View';
import {Article, Category} from '../../Class';
import {ModalProps} from 'antd/lib/modal';
import {markdownConverter} from '../../Singleton';
import {message, notification} from 'antd';
import {Blog} from '../../Api';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {NativeButtonProps} from 'antd/lib/button/button';
import {useHistory} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import querystring from 'querystring';
import {SwitchProps} from 'antd/lib/switch';

interface IProps
{
    categoryIdFilter?: number, // 限定文章的分类
}

function ArticleList(props: IProps)
{
    const [articleMap, setArticleMap] = useState(new Map<number, Article>());
    const [categoryMap, setCategoryMap] = useState(new Map<number, Category>());
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [isArticleLoading, setIsArticleLoading] = useState(false);
    const [loadingArticleId, setLoadingArticleId] = useState(0);

    const [articleInModalTitle, setArticleInModalTitle] = useState('');
    const [articleInModalHTMLContent, setArticleInModalHTMLContent] = useState('');
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const [idOfArticleToDelete, setIdOfArticleToDelete] = useState(0);

    const history = useHistory();

    const {categoryIdFilter} = props;

    useEffect(() =>
    {
        setIsCategoryLoading(true);
        Blog.Category.getAll()
            .then((categoryList) =>
            {
                if (categoryList !== null)
                {
                    const categoryMap: Map<number, Category> = new Map<number, Category>();
                    categoryList.forEach(category =>
                    {
                        categoryMap.set(category.id!, category);
                    });
                    setCategoryMap(categoryMap);
                }
            })
            .finally(() =>
            {
                setIsCategoryLoading(false);
            });
    }, []);

    useEffect(() =>
    {
        setIsArticleLoading(true);
        Promise.resolve()
            .then(() =>
            {
                if (typeof categoryIdFilter === 'undefined')
                {
                    return Blog.Article.getAll();
                }
                else
                {
                    return Blog.Article.getByCategory(categoryIdFilter);
                }
            })
            .then((articleList) =>
            {
                if (articleList !== null)
                {
                    const articleMap: Map<number, Article> = new Map<number, Article>();
                    articleList.forEach(article =>
                    {
                        articleMap.set(article.id!, article);
                    });

                    setArticleMap(articleMap);
                }
            })
            .finally(() =>
            {
                setIsArticleLoading(false);
            });
    }, [categoryIdFilter]);

    const modalOnOk: ModalProps['onOk'] = () =>
    {
        setModalIsVisible(!modalIsVisible);
    };

    const modalOnCancel: ModalProps['onCancel'] = modalOnOk;

    const onArticleTitleClick: (id: number) => DOMAttributes<HTMLSpanElement>['onClick'] = (id: number) =>
    {
        return e =>
        {
            e.preventDefault();
            const article = articleMap.get(id);
            if (typeof article === 'undefined')
            {
                message.warning('文章不存在');
            }
            else
            {
                setArticleInModalTitle(article.title);
                setArticleInModalHTMLContent(markdownConverter.makeHtml(article.content));
                setModalIsVisible(true);
            }
        };
    };

    const onIsVisibleSwitchClick: (id: number) => SwitchProps['onClick'] = (id: number) =>
    {
        return async checked =>
        {
            setLoadingArticleId(id);
            const result = await Blog.Article.modify({id, isVisible: checked});
            if (result !== null)
            {
                const article = articleMap.get(id);
                if (article === undefined)
                {
                    message.warning('文章不存在');
                }
                else
                {
                    article.isVisible = checked;
                    setArticleMap(new Map(articleMap));
                    setLoadingArticleId(0);
                }
            }
        };
    };

    const onModifyArticleButtonClick: (id: number) => NativeButtonProps['onClick'] = (id: number) =>
    {
        return e =>
        {
            e.preventDefault();
            history.push(`${PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]}?${querystring.encode({id})}`);
        };
    };

    const onDeleteArticleButtonClick: (id: number) => NativeButtonProps['onClick'] = (id: number) =>
    {
        return () =>
        {
            setIdOfArticleToDelete(id);
        };
    };

    const onDeleteArticleConfirm: PopconfirmProps['onConfirm'] = async () =>
    {
        const result = await Blog.Article.deleteById(idOfArticleToDelete);
        if (result !== null)
        {
            notification.success({
                message: '文章删除成功',
            });
            articleMap.delete(idOfArticleToDelete);
            setArticleMap(new Map(articleMap));
        }
    };

    return (<View isLoading={isCategoryLoading || isArticleLoading}
                  articleMap={articleMap}
                  categoryMap={categoryMap}
                  modalIsVisible={modalIsVisible}
                  articleInModalTitle={articleInModalTitle}
                  articleInModalHTMLContent={articleInModalHTMLContent}
                  modalOnOk={modalOnOk}
                  modalOnCancel={modalOnCancel}
                  loadingArticleId={loadingArticleId}
                  onArticleTitleClick={onArticleTitleClick}
                  onIsVisibleSwitchClick={onIsVisibleSwitchClick}
                  onModifyArticleButtonClick={onModifyArticleButtonClick}
                  onDeleteArticleButtonClick={onDeleteArticleButtonClick}
                  onDeleteArticleConfirm={onDeleteArticleConfirm} />);
}

export default React.memo(ArticleList);