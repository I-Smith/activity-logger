import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';

import { store } from './_helpers';
import { App } from './App';
import './index.css';

Modal.setAppElement('#app');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);