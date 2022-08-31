import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'typeface-montserrat';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import store from './Store/Index';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

