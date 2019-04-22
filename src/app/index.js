import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import App from 'components/app';

import setupStore from './setup-store';

import 'styles/basic.css';
import 'styles/main.scss';

const store = setupStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route
                path='/'
                component={App}
            />
        </HashRouter>
    </Provider>,
    document.getElementById('app'), // eslint-disable-line no-undef
);
