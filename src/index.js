import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import log from 'loglevel'

log.setLevel('debug') // FIXME

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
