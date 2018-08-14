import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from 'react-global-configuration';

config.set({ url: 'https://jsonplaceholder.typicode.com/' });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();