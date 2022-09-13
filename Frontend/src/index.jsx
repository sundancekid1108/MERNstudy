import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import 'typeface-montserrat';
import { createRoot } from 'react-dom/client';


import store from './Store/Index';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

