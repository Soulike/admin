import React, {PureComponent} from 'react';
import View from './View';
import {Article} from '../../../../Class';
import faker from 'faker';

interface State
{
    articleList: Array<Article>;
}

interface Props
{

}

class Manage extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            articleList: [],
        };
    }

    componentDidMount()
    {
        // 调试代码
        faker.locale = 'zh_CN';
        const articleList: Array<Article> = [];
        for (let i = 1; i < 101; i++)
        {
            articleList.push(new Article(
                i,
                faker.lorem.sentence(),
                faker.lorem.paragraphs(),
                1,
                faker.date.past().toString(),
                faker.date.past().toString(),
                faker.random.number(),
                faker.random.boolean(),
            ));
        }
        this.setState({articleList});
    }


    render()
    {
        const {articleList} = this.state;
        return (<View articleList={articleList} />);
    }
}

export default Manage;