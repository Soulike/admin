import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {Provider} from 'react-redux';
import Store from './Store';
import * as serviceWorker from './serviceWorker';
import Loading from './Component/Loading';
import './ModuleConfig/Antd';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd';
import {Router} from './Router';

const container = ReactDOM.createRoot(document.getElementById('root')!);

container.render((
    <React.StrictMode>
        <Suspense fallback={<Loading />}>
            <Provider store={Store}>
                <ConfigProvider locale={zhCN}>
                    <Router />
                </ConfigProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
