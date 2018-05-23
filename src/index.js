import React from 'react';
import { render } from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

import App from 'scenes/App';

import { injectGlobal } from 'styled-components';
import configureStore from "./redux/store";

WebFont.load({
    google: {
        families: ['Roboto:300,400,700', 'sans-serif']
    }
});

injectGlobal`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        transition: all 0.4s;
    }
    
    body {
        font-family: "Roboto", sans-serif;
        line-height: 1;
    }
`;

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);