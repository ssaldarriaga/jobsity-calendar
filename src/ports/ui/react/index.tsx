import React from 'react';
import { App } from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Utils
import { THEME } from '../../../domain/styles/theme';

// Redux
import { store } from '../../redux/store';

const render = () => {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <ThemeProvider theme={THEME.dark}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.Fragment>,
    document.getElementById('root'),
  );
};

export default render;
