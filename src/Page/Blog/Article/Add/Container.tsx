import React, {PureComponent} from 'react';
import View from './View';
import {Article, Category} from '../../../../Class';
import {InputProps, TextAreaProps} from 'antd/lib/input';
import {SelectProps} from 'antd/lib/select';
import {NativeButtonProps} from 'antd/lib/button/button';
import {addArticle, getAllCategory} from '../../../../Api';
import {message, notification} from 'antd';
import {CheckboxProps} from 'antd/lib/checkbox';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {markdownConverter} from '../../../../Singleton';

interface Props extends RouteComponentProps {}

interface State
{
    title: string,
    content: string,
    category: number | undefined,
    isVisible: boolean,
    categoryOption: Array<Category>,
    isLoadingCategory: boolean,
    isSubmittingArticle: boolean,
    isArticlePreviewModalVisible: boolean,
    HTMLContent: string,
}

class Add extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            title: '',
            content: '',
            category: undefined,
            isVisible: true,
            categoryOption: [],
            isLoadingCategory: false,
            isSubmittingArticle: false,
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
        this.getCategoryOption();
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

    getCategoryOption = async () =>
    {
        await this.setStatePromise({isLoadingCategory: true});
        const category = await getAllCategory();
        if (category !== null)
        {
            this.setState({categoryOption: category});
            await this.setStatePromise({isLoadingCategory: false});
        }
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
        const {title, content, category, isVisible} = this.state;
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
            const result = await addArticle(
                new Article(
                    undefined,
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
                notification.success({message: '文章提交成功'});
                await this.setStatePromise(
                    {
                        title: '',
                        content: '',
                        category: undefined,
                        isVisible: true,
                        isLoadingCategory: false,
                        isSubmittingArticle: false,
                    },
                );
            }
        }
    };

    render()
    {
        const {title, content, category, isVisible, categoryOption, isLoadingCategory, isSubmittingArticle, isArticlePreviewModalVisible, HTMLContent} = this.state;
        return (<View title={title}
                      content={content}
                      category={category}
                      isVisible={isVisible}
                      categoryOption={categoryOption}
                      onTitleInputChange={this.onTitleInputChange}
                      onContentTextAreaChange={this.onContentTextAreaChange}
                      onCategorySelectorChange={this.onCategorySelectorChange}
                      onIsVisibleCheckboxChange={this.onIsVisibleCheckboxChange}
                      onSubmitButtonClick={this.onSubmitButtonClick}
                      isLoadingCategory={isLoadingCategory}
                      isSubmittingArticle={isSubmittingArticle}
                      isArticlePreviewModalVisible={isArticlePreviewModalVisible}
                      onArticlePreviewButtonClick={this.onArticlePreviewButtonClick}
                      HTMLContent={HTMLContent} />);
    }
}

export default withRouter(Add);