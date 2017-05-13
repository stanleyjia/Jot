var React = require('react')
var browserHistory = require('react-router').browserHistory


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (formData['password'] == formData['confirmpassword']){
        
            fetch('http://127.0.0.1:5000/api/register', {
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
                /*if successful, redirect*/
                if (response.status == 201){
                    browserHistory.push('/login');
                }
            })
        }
        else {
            alert("Two password entries do not match")
        }
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
            li > < a href = "/ " > home < /a></li >
            <
            li > < a href = "/login" > sign in < /a></li >
                <li><a href="/register">register</a></li>
                < li > < a href > help < /a></li > < li > < a href > about < /a></li > < li > < a href > contact < /a></li > < /ul> < /
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
                    marginTop: '-90px'
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
                    marginTop: '-20px'
                }
            }
            /> 
              < input className = " input-lg textbox"
            type = "password"
            placeholder = "Confirm Password"
            name = "confirmpassword"
            ref = 'confirmpassword'
            required style = {
                {
                    marginLeft: '13%',
                    marginTop: '25px'
                }
            }
            />  
                <
            button className = " btn-primary textbox"
            type = "submit"
            id = "submitButton"
            style = {
                {
                    marginLeft: '13%',
                    marginTop: 80
                }
            } > Register < /button > < /
            form > <
            /div > < /
            div > <
            /div > < /
            div >
        );
    }
};
module.exports = Register;