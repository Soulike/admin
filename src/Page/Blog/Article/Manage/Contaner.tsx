import React, {DOMAttributes, PureComponent} from 'react';
import View from './View';
import {Article, Category} from '../../../../Class';
import {ModalProps} from 'antd/lib/modal';
import {markdownConverter} from '../../../../Singleton';
import {message, notification} from 'antd';
import {deleteArticleById, getAllArticle, modifyArticle} from '../../../../Api/Blog/Article';
import {getAllCategory} from '../../../../Api/Blog/Category';
import {PopconfirmProps} from 'antd/lib/popconfirm';
import {NativeButtonProps} from 'antd/lib/button/button';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG/PAGE';
import querystring from 'querystring';
import {SwitchProps} from 'antd/lib/switch';

interface State
{
    articleMap: Map<number, Article>;
    categoryMap: Map<number, Category>,
    isLoading: boolean,
    loadingArticleId: number,

    articleInModalTitle: string,
    articleInModalHTMLContent: string,
    modalIsVisible: boolean,

    idOfArticleToDelete: number,
}

interface Props extends RouteComponentProps {}

class Manage extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            articleMap: new Map<number, Article>(),
            categoryMap: new Map<number, Category>(),
            isLoading: false,
            loadingArticleId: 0,

            articleInModalTitle: '',
            articleInModalHTMLContent: '',
            modalIsVisible: false,

            idOfArticleToDelete: 0,
        };
    }

    setStatePromise<K extends keyof State>(state: ((prevState: Readonly<State>, props: Readonly<Props>) => (Pick<State, K> | State | null)) | Pick<State, K> | State | null): Promise<void>
    {
        return new Promise<void>(resolve =>
        {
            this.setState(state, () =>
            {
                resolve();
            });
        });
    }

    componentDidMount()
    {
        this.setStatePromise({isLoading: true})
            .then(() =>
            {
                return Promise.all([
                    getAllArticle(),
                    getAllCategory(),
                ]);
            })
            .then(([articleList, categoryList]) =>
            {
                if (articleList !== null && categoryList !== null)
                {
                    const articleMap: Map<number, Article> = new Map<number, Article>();
                    const categoryMap: Map<number, Category> = new Map<number, Category>();
                    articleList.forEach(article =>
                    {
                        articleMap.set(article.id!, article);
                    });
                    categoryList.forEach(category =>
                    {
                        categoryMap.set(category.id!, category);
                    });

                    return this.setStatePromise({articleMap, categoryMap});
                }
            })
            .then(() =>
            {
                return this.setStatePromise({isLoading: false});
            });
    }

    modalOnOk: ModalProps['onOk'] = () =>
    {
        const {modalIsVisible} = this.state;
        this.setState({modalIsVisible: !modalIsVisible});
    };

    modalOnCancel: ModalProps['onCancel'] = this.modalOnOk;

    onArticleTitleClick: (id: number) => DOMAttributes<HTMLSpanElement>['onClick'] = (id: number) =>
    {
        return e =>
        {
            e.preventDefault();
            const {articleMap} = this.state;
            const article = articleMap.get(id);
            if (typeof article === 'undefined')
            {
                message.warning('文章不存在');
            }
            else
            {
                this.setState({
                    articleInModalTitle: article.title!,
                    articleInModalHTMLContent: markdownConverter.makeHtml(article.content!),
                    modalIsVisible: true,
                });
            }
        };
    };

    onIsVisibleSwitchClick: (id: number) => SwitchProps['onClick'] = (id: number) =>
    {
        return async checked =>
        {
            await this.setStatePromise({loadingArticleId: id});
            const result = await modifyArticle(new Article(id, undefined, undefined, undefined, undefined, undefined, undefined, checked));
            if (result !== null)
            {
                const {articleMap} = this.state;
                const article = articleMap.get(id);
                if (article === undefined)
                {
                    message.warning('文章不存在');
                }
                else
                {
                    article.isVisible = checked;
                    article.modificationTime = (new Date()).toISOString();
                    this.forceUpdate();
                    await this.setStatePromise({loadingArticleId: 0});
                }
            }
        };
    };

    onModifyArticleButtonClick: (id: number) => NativeButtonProps['onClick'] = (id: number) =>
    {
        return e =>
        {
            e.preventDefault();
            const {history} = this.props;
            history.push(`${PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MODIFY]}?${querystring.encode({id})}`);
        };
    };

    onDeleteArticleButtonClick: (id: number) => NativeButtonProps['onClick'] = (id: number) =>
    {
        return () =>
        {
            this.setState({idOfArticleToDelete: id});
        };
    };

    onDeleteArticleConfirm: PopconfirmProps['onConfirm'] = async () =>
    {
        const {idOfArticleToDelete, articleMap} = this.state;
        const result = await deleteArticleById(idOfArticleToDelete);
        if (result !== null)
        {
            notification.success({
                message: '文章删除成功',
            });
            articleMap.delete(idOfArticleToDelete);
            this.forceUpdate();
        }
    };

    render()
    {
        const {articleMap, categoryMap, modalIsVisible, loadingArticleId, articleInModalHTMLContent, articleInModalTitle, isLoading} = this.state;
        return (<View isLoading={isLoading}
                      articleMap={articleMap}
                      categoryMap={categoryMap}
                      modalIsVisible={modalIsVisible}
                      articleInModalTitle={articleInModalTitle}
                      articleInModalHTMLContent={articleInModalHTMLContent}
                      modalOnOk={this.modalOnOk}
                      modalOnCancel={this.modalOnCancel}
                      loadingArticleId={loadingArticleId}
                      onArticleTitleClick={this.onArticleTitleClick}
                      onIsVisibleSwitchClick={this.onIsVisibleSwitchClick}
                      onModifyArticleButtonClick={this.onModifyArticleButtonClick}
                      onDeleteArticleButtonClick={this.onDeleteArticleButtonClick}
                      onDeleteArticleConfirm={this.onDeleteArticleConfirm} />);
    }
}

export default withRouter(Manage);