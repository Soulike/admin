import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import Store from './Store';
import * as serviceWorker from './serviceWorker';
import Loading from './Component/Loading';
import './ModuleConfig';
import zhCN from 'antd/es/locale/zh_CN';

const ConfigProvider = React.lazy(() => import('antd/lib/config-provider'));
const Router = React.lazy(() => import('./Router'));

ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <ConfigProvider locale={zhCN}>
            <Provider store={Store}>
                <Router />
            </Provider>
        </ConfigProvider>
    </Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
