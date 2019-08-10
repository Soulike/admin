import React, {ChangeEvent, FormEvent, PureComponent} from 'react';
import LoginView from './View';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../CONFIG/PAGE';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {login} from '../../Api';
import {message} from 'antd';

interface Props extends RouteComponentProps {}

interface State
{
    username: string,
    password: string,
}

class Login extends PureComponent<Props, State>
{
    constructor(props: Props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    onUsernameInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({username: e.target.value});
    };

    onPasswordInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        this.setState({password: e.target.value});
    };

    onLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        const {username, password} = this.state;
        const isSuccessful = await login(username, password);
        if (isSuccessful)
        {
            message.success('登录成功');
            this.props.history.push(PAGE_ID_TO_ROUTE[PAGE_ID.MANAGE.INDEX]);
        }
    };

    render()
    {
        const {username, password} = this.state;
        return (
            <LoginView username={username} password={password}
                       onLoginFormSubmit={this.onLoginFormSubmit}
                       onPasswordInputChange={this.onPasswordInputChange}
                       onUsernameInputChange={this.onUsernameInputChange} />
        );
    }
}

export default withRouter(Login);