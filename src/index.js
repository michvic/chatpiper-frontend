

import {config} from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import App from './App';
import * as serviceWorker from './serviceWorker';

import chatpipeApp from './store/reducers'
import { createStore } from 'redux'
import { Provider } from "react-redux";

const store = createStore(chatpipeApp)

config({ path: '../.env' })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
