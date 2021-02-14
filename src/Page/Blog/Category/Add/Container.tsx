import React, {useState} from 'react';
import View from './View';
import {InputProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';
import {message, notification} from 'antd';
import {Blog} from '../../../../Api';

function Add()
{
    const [categoryName, setCategoryName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onCategoryNameInputChange: InputProps['onChange'] = e =>
    {
        setCategoryName(e.target.value);
    };

    const initAfterSubmit = () =>
    {
        setCategoryName('');
        setIsSubmitting(false);
    };

    const onSubmitButtonClick: NativeButtonProps['onClick'] = async e =>
    {
        e.preventDefault();
        if (categoryName.length === 0)
        {
            message.warning('分类名不能为空');
        }
        else
        {
            setIsSubmitting(true);
            const result = await Blog.Category.add({name: categoryName});
            setIsSubmitting(false);
            if (result !== null)
            {
                notification.success({message: '分类添加成功'});
                initAfterSubmit();
            }
        }
    };

    return (<View categoryName={categoryName}
                  onCategoryNameInputChange={onCategoryNameInputChange}
                  onSubmitButtonClick={onSubmitButtonClick}
                  isSubmitting={isSubmitting} />);
}

export default React.memo(Add);