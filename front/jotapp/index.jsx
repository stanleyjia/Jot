import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main.jsx';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
    </Router>
    , document.getElementById('app'));