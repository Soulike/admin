import React, {PureComponent} from 'react';
import View from './View';
import {InputProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';
import {message, notification} from 'antd';
import {addCategory} from '../../../../Api';
import {Category} from '../../../../Class';

interface Props {}

interface State
{
    categoryName: string,
    isSubmitting: boolean,
}

class Add extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            categoryName: '',
            isSubmitting: false,
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

    onCategoryNameInputChange: InputProps['onChange'] = e =>
    {
        this.setState({categoryName: e.target.value});
    };

    onSubmitButtonClick: NativeButtonProps['onClick'] = async e =>
    {
        e.preventDefault();
        const {categoryName} = this.state;
        if (categoryName.length === 0)
        {
            message.warning('分类名不能为空');
        }
        else
        {
            await this.setStatePromise({isSubmitting: true});
            const result = await addCategory(new Category(undefined, categoryName));
            await this.setStatePromise({isSubmitting: false});
            if (result !== null)
            {
                notification.success({message: '分类添加成功'});
                this.setState({
                    categoryName: '',
                    isSubmitting: false,
                });
            }
        }
    };

    render()
    {
        const {categoryName, isSubmitting} = this.state;
        return (<View categoryName={categoryName}
                      onCategoryNameInputChange={this.onCategoryNameInputChange}
                      onSubmitButtonClick={this.onSubmitButtonClick} isSubmitting={isSubmitting} />);
    }
}

export default Add;