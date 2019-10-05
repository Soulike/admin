import React, {PureComponent} from 'react';
import View from './View';
import {TextAreaProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';
import {ModalProps} from 'antd/lib/modal';
import {message, notification} from 'antd';
import {Blog} from '../../../../Api';

interface Props {}

interface State
{
    about: string,
    previewModalVisible: boolean,
    loading: boolean,
}

class About extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            about: '',
            previewModalVisible: false,
            loading: true,
        };
    }

    async componentDidMount()
    {
        const result = await Blog.Option.get();
        if (result !== null)
        {
            const {about} = result;
            this.setState({
                about,
                loading: false,
            });
        }
    }


    onAboutTextareaChange: TextAreaProps['onChange'] = e =>
    {
        this.setState({about: e.target.value});
    };

    onPreviewButtonClick: NativeButtonProps['onClick'] = () =>
    {
        this.setState({previewModalVisible: true});
    };

    onSubmitButtonClick: NativeButtonProps['onClick'] = async () =>
    {
        const {about} = this.state;
        if (about.length !== 0)
        {
            const result = await Blog.Option.set(about);
            if (result !== null)
            {
                notification.success({message: '修改关于成功'});
            }
        }
        else
        {
            message.warning('关于内容不能为空');
        }
    };

    onPreviewModalOk: ModalProps['onOk'] = () =>
    {
        this.setState({previewModalVisible: false});
    };

    onPreviewModalCancel: ModalProps['onCancel'] = () =>
    {
        this.setState({previewModalVisible: false});
    };


    render()
    {
        const {about, previewModalVisible, loading} = this.state;
        return (<View onSubmitButtonClick={this.onSubmitButtonClick}
                      about={about}
                      previewModalVisible={previewModalVisible}
                      onAboutTextareaChange={this.onAboutTextareaChange}
                      onPreviewButtonClick={this.onPreviewButtonClick}
                      onPreviewModalCancel={this.onPreviewModalCancel}
                      onPreviewModalOk={this.onPreviewModalOk} loading={loading} />);
    }
}

export default About;