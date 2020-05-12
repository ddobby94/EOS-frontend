import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './redux/store/configureStore';
import Root from './containers/Root';
import './styles/styles.scss';
require('../public/favicon.ico');

const { store, persistor } = configureStore();

render(
  <AppContainer>
    <Root persistor={persistor} store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NewRoot persistor={persistor} store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
