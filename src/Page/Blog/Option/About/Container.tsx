import React, {useEffect, useState} from 'react';
import View from './View';
import {Blog} from '../../../../Api';
import {TextAreaProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';
import {message, notification} from 'antd';
import {ModalProps} from 'antd/lib/modal';

function About()
{
    const [about, setAbout] = useState('');
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
        setLoading(true);
        Blog.Option.get()
            .then(result =>
            {
                if (result !== null)
                {
                    const {about} = result;
                    setAbout(about);
                    setLoading(false);
                }
            });
    }, []);

    const onAboutTextareaChange: TextAreaProps['onChange'] = e =>
    {
        setAbout(e.target.value);
    };

    const onPreviewButtonClick: NativeButtonProps['onClick'] = () =>
    {
        setPreviewModalVisible(true);
    };

    const onSubmitButtonClick: NativeButtonProps['onClick'] = async () =>
    {
        if (about.length !== 0)
        {
            setLoading(true);
            const result = await Blog.Option.set(about);
            setLoading(false);
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

    const onPreviewModalOk: ModalProps['onOk'] = () =>
    {
        setPreviewModalVisible(false);
    };

    const onPreviewModalCancel: ModalProps['onCancel'] = onPreviewModalOk;

    return (<View onSubmitButtonClick={onSubmitButtonClick}
                  about={about}
                  previewModalVisible={previewModalVisible}
                  onAboutTextareaChange={onAboutTextareaChange}
                  onPreviewButtonClick={onPreviewButtonClick}
                  onPreviewModalCancel={onPreviewModalCancel}
                  onPreviewModalOk={onPreviewModalOk} loading={loading} />);
}

export default React.memo(About);