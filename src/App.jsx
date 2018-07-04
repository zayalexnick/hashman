import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import { ThemeProvider, injectGlobal } from 'styled-components';
import configureStore from './redux/confugureStore';

moment.locale('ru');

import theme from '~/theme';

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-transform: uppercase !important;
    font-weight: 300 !important;
  }
  
  body {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1;
    overflow-x: hidden;
  }
  
  button, select, textarea, input {
    font-family: 'Roboto', Arial, sans-serif;
    outline: none;
  }
  
  button, input[type=submit] {
    cursor: pointer;
  }
  
  main {
    overflow-x: hidden;
  }
`;

import Root from '~/scenes/Root';

export default () => (
    <Provider store={configureStore()}>
        <ThemeProvider theme={theme}>
            <Root />
        </ThemeProvider>
    </Provider>
);