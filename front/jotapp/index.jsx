import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import App from './components/app.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/app" component={App}/>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login} /></Router>
    , document.getElementById('app'));