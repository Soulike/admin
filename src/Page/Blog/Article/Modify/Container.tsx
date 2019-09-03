import React, {PureComponent} from 'react';
import View from './View';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Article, Category} from '../../../../Class';
import querystring from 'querystring';
import {message, notification} from 'antd';
import {getAllCategory} from '../../../../Api/Blog/Category';
import {getArticleById, modifyArticle} from '../../../../Api/Blog/Article';
import {NativeButtonProps} from 'antd/lib/button/button';
import {markdownConverter} from '../../../../Singleton';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {SelectProps} from 'antd/lib/select';
import {CheckboxProps} from 'antd/lib/checkbox';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../../CONFIG/PAGE';

interface Props extends RouteComponentProps {}

interface State
{
    id: number,
    title: string,
    content: string,
    category: number | undefined,
    isVisible: boolean,
    categoryOption: Array<Category>,
    isLoadingCategory: boolean,
    isLoadingArticle: boolean,
    isSubmittingArticle: boolean,
    isArticlePreviewModalVisible: boolean,
    HTMLContent: string,
}

class Modify extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            id: 0,
            title: '',
            content: '',
            category: undefined,
            isVisible: true,
            categoryOption: [],
            isLoadingCategory: false,
            isSubmittingArticle: false,
            isLoadingArticle: true,
            isArticlePreviewModalVisible: false,
            HTMLContent: '',
        };
    }

    setStatePromise(state: any): Promise<void>
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
        // 查询字符串格式为 ?id=xxx
        const {location: {search}} = this.props;
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
                // 获取所有种类及文章内容
                this.setStatePromise({id, isLoadingCategory: true})
                    .then(() =>
                    {
                        return Promise.all([
                            getAllCategory(),
                            getArticleById(id),
                        ]);
                    })
                    .then(([categoryList, article]) =>
                    {
                        if (categoryList !== null && article !== null)
                        {
                            const {title, content, category, isVisible} = article;
                            return this.setStatePromise({
                                title: title!,
                                content: content!,
                                category: category!,
                                isVisible: isVisible!,
                                categoryOption: categoryList,
                                isLoadingArticle: false,
                                isLoadingCategory: false,
                            });
                        }
                    });
            }
        }
    }

    onArticlePreviewButtonClick: NativeButtonProps['onClick'] = e =>
    {
        e.preventDefault();
        const {isArticlePreviewModalVisible, content} = this.state;
        this.setState({
            isArticlePreviewModalVisible: !isArticlePreviewModalVisible,
            HTMLContent: markdownConverter.makeHtml(content),
        });
    };

    onTitleInputChange: InputProps['onChange'] = e =>
    {
        this.setState({title: e.target.value});
    };

    onContentTextAreaChange: TextAreaProps['onChange'] = e =>
    {
        this.setState({content: e.target.value});
    };

    onCategorySelectorChange: SelectProps['onChange'] = value =>
    {
        this.setState({category: value as number}); // 在 View 中设置的是 number
    };

    onIsVisibleCheckboxChange: CheckboxProps['onChange'] = e =>
    {
        this.setState({isVisible: e.target.checked});
    };

    onSubmitButtonClick: NativeButtonProps['onClick'] = async e =>
    {
        e.preventDefault();
        const {id, title, content, category, isVisible} = this.state;
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
            await this.setStatePromise({isSubmittingArticle: true});
            const result = await modifyArticle(
                new Article(
                    id,
                    title,
                    content,
                    category,
                    undefined,
                    undefined,
                    undefined,
                    isVisible));
            await this.setStatePromise({isSubmittingArticle: false});
            if (result !== null)
            {
                notification.success({message: '文章修改成功'});
                const {history} = this.props;
                history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.BLOG.ARTICLE.MANAGE]);
            }
        }
    };


    render()
    {
        return (
            <View {...this.state} onArticlePreviewButtonClick={this.onArticlePreviewButtonClick}
                  onSubmitButtonClick={this.onSubmitButtonClick}
                  onIsVisibleCheckboxChange={this.onIsVisibleCheckboxChange}
                  onCategorySelectorChange={this.onCategorySelectorChange}
                  onContentTextAreaChange={this.onContentTextAreaChange}
                  onTitleInputChange={this.onTitleInputChange} />
        );
    }
}

export default withRouter(Modify);