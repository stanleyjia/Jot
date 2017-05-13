import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
var browserHistory = require('react-router').browserHistory

import App from './components/app.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Log from './components/log.jsx';
import cookie from 'react-cookie';

var customData ={
    user: "",
    pass: ""
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
       /* document.cookie = "user="+data.user+";path=/"
        document.cookie = "pass="+data.pass+";path=/"*/
        setCookie('user', data.user, 2)
        setCookie('pass', data.pass, 2)
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
class AppWrapper extends React.Component {
    render() {
        return <App userInfo={customData} />
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/app" component={AppWrapper}/>
        <Route path="/" component={Home}/>
        <Route path="/login" component={LoginWrapper} />
        <Route path="/register" component={Register} />
        <Route path="/log" component={LogWrapper} />
    </Router>
    , document.getElementById('app'));