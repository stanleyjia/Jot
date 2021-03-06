var React = require('react')
var browserHistory = require('react-router').browserHistory
var cookie = require('react-cookie');

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        //check cookies
       /* var username = getCookie("user");
        if (username != "") {
            alert("Welcome again " + username);
            browserHistory.push('/app');
        } */
    }
    handleSubmit(e) {
        e.preventDefault();
        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;

        }
       // alert(formData['username'] + ':' + formData['password'])
      
        var data={
            user: formData['username'],
            pass: formData['password']
        }
        //handoff to parent
        this.props.onLoginInfo(data)
        
        //set cookies
        setCookie('user', data.user, 2)
        setCookie('pass', data.pass, 2)
        
     fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: formData['username'],
                pass: formData['password']
            })
        })
        .then(response => response.json())
        .then(response => {
                console.log(response)
                /*if successful login, redirect*/
                if (response.status == 202){
                    browserHistory.push('/app');
                }
            
         
            })
    }
    render() {
        return ( < div > < title > Sign in < /title> <
            meta charSet = "utf-8" / > < meta name = "viewport"
            content = "width=device-width, initial-scale=1" / > < link rel = "stylesheet"
            href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity = "sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossOrigin = "anonymous" / > < link rel = "stylesheet"
            type = "text/css"
            href = "../static/mystyle.css" / > < header > < nav className = "navbar navbar navbar-fixed-top"
            role = "navigation" > < div className = "container-fluid" > < div className = "navbar-header"
            style = {
                {
                    listStyleType: 'none',
                    padding: 0,
                    marginLeft: 60,
                    width: 250,
                    height: 62
                }
            } > < button type = "button"
            className = "navbar-toggle"
            data-toggle = "collapse"
            data-target = "#navbar2" > < span className = "icon-bar" / > < span className = "icon-bar" / > < span className = "icon-bar" / > < /button> <
            a className = "navbar-brand"
            style = {
                {
                    height: 60,
                    width: 'auto',
                    padding: 0,
                    margin: 0
                }
            }
            href = "/ " > < img style = {
                {
                    width: 70,
                    height: 60
                }
            }
            src = "../static/logo.png" / > < /a> <
            img className = "navbar-brand"
            style = {
                {
                    margin: 0,
                    position: 'fixed',
                    width: 150,
                    height: 15,
                    padding: 0,
                    marginTop: 30,
                    marginLeft: 10
                }
            }
            src = "../static/5MinuteJournalText.png" / >
            <
            /div> <
            div className = "collapse navbar-collapse"
            id = "navbar2" >
            <
            ul className = "nav navbar-nav navbar-right" >
            <
            li > < a href = "/" > home < /a></li >
            <
            li > < a href = "login" > login < /a></li > < li > < a href > help < /a></li > < li > < a href > about < /a></li > < li > < a href > contact < /a></li > < /ul> < /
            div > < /div> < /
            nav > < /header> <
            div className = "jumbotron vertical-center"
            style = {
                {
                    backgroundColor: '#EFEFEF',
                    height: 700,
                    marginTop: 60
                }
            } >
            <
            div className = "container vertical-center"
            id = "loginContainer" >
            <
            div className = "imgcontainer" >
            <
            img id = "loginLogo"
            src = "../static/logo_gray.png " / >
            <
            /div> <
            div className = "container vertical-center"
            id = "logininput" >
            <
            form method = "post"
            onSubmit = {
                this.handleSubmit
            } >
            <
            input className = "input-lg textbox"
            type = "text"
            placeholder = "Email Address"
            name = "username"
            ref = "username"
            required style = {
                {
                    marginLeft: '13%',
                    marginTop: '-80px'
                }
            }
            / > < input className = " input-lg textbox"
            type = "password"
            placeholder = "Password"
            name = "password"
            ref = "password"
            required style = {
                {
                    marginLeft: '13%',
                    marginTop: '-40px'
                }
            }
            /> <
            button className = " btn-primary textbox"
            type = "submit"
            id = "submitButton"
            style = {
                {
                    marginLeft: '13%',
                    marginTop: 20
                }
            } > Login < /button > < /
            form > <
            /div > < /
            div > <
            /div > < /
            div >
        );
    }
};
module.exports = Login;