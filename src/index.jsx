import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';
import { DataServiceProvider } from './components/data-service-context';

import DeseaseService from './services';

const service = new DeseaseService();
// const data = service.getGlobalData();
// console.log(data);

ReactDOM.render(
  <Provider store={store}>
    <DataServiceProvider value={service}>
      <App />
    </DataServiceProvider>
  </Provider>,
  document.getElementById('root')
);
