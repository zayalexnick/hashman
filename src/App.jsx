import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import configureStore from './redux/confugureStore';

import theme from '~/theme';

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1;
  }
  
  button, select, textarea, input {
    font-family: 'Roboto', Arial, sans-serif;
    outline: none;
  }
  
  button, input[type=submit] {
    cursor: pointer;
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