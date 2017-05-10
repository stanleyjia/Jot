import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import App from './components/app.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Log from './components/log.jsx';


var customData ={
    user: "",
    pass: ""
}

class LoginWrapper extends React.Component {
    constructor(props){
        super();
        this.state = {
            user: "",
            pass: ""
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin (data) {
        console.log(data)
        var user = data.user
        var pass = data.pass
        this.setState({user: user, pass: pass})
        customData.user = user
        customData.pass = pass
        

    }
    render () {
        return(
            <Login onLoginInfo={this.handleLogin} />
        )
    }
}

class LogWrapper extends React.Component {
    render() {
        return(
            <Log userInfo={customData} />
        )
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/app" component={App}/>
        <Route path="/" component={Home}/>
        <Route path="/login" component={LoginWrapper} />
        <Route path="/register" component={Register} />
        <Route path="/log" component={LogWrapper} />
    </Router>
    , document.getElementById('app'));