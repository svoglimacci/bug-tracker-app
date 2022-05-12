import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import theme from './theme';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import App from './App';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
