import React from 'react';
import Style from './Style.module.scss';
import {Button, Input} from 'antd';
import {InputProps} from 'antd/lib/input';
import {NativeButtonProps} from 'antd/lib/button/button';

interface Props
{
    categoryName: string,
    onCategoryNameInputChange: InputProps['onChange'],
    onSubmitButtonClick: NativeButtonProps['onClick'],
    isSubmitting: boolean,
}

function AddView(props: Props)
{
    const {categoryName, onCategoryNameInputChange, onSubmitButtonClick, isSubmitting} = props;
    return (
        <div className={Style.Add}>
            <Input size={'large'} disabled={isSubmitting}
                   className={Style.categoryInput}
                   placeholder={'新分类名'}
                   value={categoryName}
                   onChange={onCategoryNameInputChange} />
            <Button loading={isSubmitting}
                    disabled={isSubmitting}
                    type={'primary'}
                    className={Style.submitButton}
                    onClick={onSubmitButtonClick}>提交</Button>
        </div>
    );
}

export default React.memo(AddView);