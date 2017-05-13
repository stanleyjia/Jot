var React = require('react')
var browserHistory = require('react-router').browserHistory
var loginLogo = {
    width: 75,
    height: 70
}
class Log extends React.Component {
    componentWillMount () {
        console.log('userinfo: ' + this.props.userInfo.user + ' : ' + this.props.userInfo.pass)
        /*no user info*/
        if (this.props.userInfo.user === "" || this.props.userInfo.pass === "") {
            browserHistory.push('/login');
        }
    }
    render () {
        return(
            <div style = {
                {
                    textAlign: "center",
                    alignItems: "center",
                    backgroundColor: '#FFFEFA'
                }
            } >
            <img style = {
                loginLogo
            }
            src = "../static/logo.png" />

            < div style = {
                {
                    backgroundColor: '#FFFEFA' ,
                    width: "70%",
                    height: "36em",
                    margin: "auto",
                    marginTop: "15px"
                }
            } >
                <div style = {
                {
                    width: "70%",
                    height: "550px",
                    margin: "auto",
                    marginTop: "15px",
                    fontSize: "24px",
                    //backgroundColor: 'aqua',
                    resize: 'none',
                    outline: 'none',
                    border: 'none',
                    overflow: 'auto',
                    boxShadow: 'none',
                }
            } >
                    <label style={
                        {
                            fontSize: "24px",
                            color: '#A9AAA9', 
                            fontFamily: 'Myriad Pro'
                        }
                    }
                        >Entries</label>
                    <table style= {
                            {marginTop:"20px",width:"100%",height:'90%', backgroundColor: "aqua"}
                        }>
                    </table>
                </div>
                </div>
            </div>
            )
    }
}
module.exports = Log;
