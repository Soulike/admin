import React, {DOMAttributes, useEffect, useState} from 'react';
import View from './View';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG';
import {useHistory} from 'react-router-dom';
import {Account} from '../../Api';
import {InputProps} from 'antd/lib/input';
import {notification} from 'antd';

function Login()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    useEffect(() =>
    {
        Account.checkSession()
            .then(res =>
            {
                if (res !== null)
                {
                    const {isInSession} = res;
                    if (isInSession)
                    {
                        history.replace(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]);
                    }
                }
            });
    }, [history]);

    const onUsernameInputChange: InputProps['onChange'] = e =>
    {
        setUsername(e.target.value);
    };

    const onPasswordInputChange: InputProps['onChange'] = e =>
    {
        setPassword(e.target.value);
    };

    const onLoginFormSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] = async e =>
    {
        e.preventDefault();
        const isSuccessful = await Account.login(username, password);
        if (isSuccessful)
        {
            notification.success({message: '登录成功'});
            history.push(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]);
        }
    };

    return (
        <View username={username} password={password}
              onLoginFormSubmit={onLoginFormSubmit}
              onPasswordInputChange={onPasswordInputChange}
              onUsernameInputChange={onUsernameInputChange} />
    );
}

export default React.memo(Login);