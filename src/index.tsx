import React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './redux/store/configureStore';
import Root from './containers/Root';
import './styles/styles.scss';
require('../public/favicon.ico');

const { store, persistor } = configureStore();

ReactDOM.render(
	<AppContainer>
		<Root persistor={persistor} store={store} history={history} />
	</AppContainer>,
  	document.getElementById('app')
);
