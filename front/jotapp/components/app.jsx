var React = require('react');
var ReactDOM = require('react-dom');
var Countable = require('countable');
var ProgressBar = require('progressbar.js');
var reactMixin = require('react-mixin');
var TimerMixin = require('react-timer-mixin')


var loginLogo = {
    width: 75,
    height: 70
}

//get cookie
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

//gets different between two strings
function getDifference(a, b) {
    var i = 0;
    var j = 0;
    var result = "";

    while (j < b.length) {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}

//convert hexCodes to Rgb format
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
//converting rbg to hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
//Check if members of array are equal
Array.prototype.allValuesSame = function () {

    for (var i = 1; i < this.length; i++) {
        if (this[i] !== this[0])
            return false;
    }

    return true;
}


class Journal extends React.Component {

    constructor(props) {
        super();
        var myTimer;
        var totalTimer;
        var lineProgress;
        var backgroundColor = '#FFFEFA';
        var lastCharArray = [];
        this.state = {
            wordCountNum: 0,
            wordLabel: 'words',
            timeCounter: 5,
            myTimer: myTimer,
            lineProgress: lineProgress,
            totalTime: 0,
            totalTimer: totalTimer,
            backgroundColor: backgroundColor,
            endColor: '#BD2133',
            readOnly: false,
            lastCharArray: lastCharArray,
            failed: false,
            timerCleared: true,
            timeCounterInterval: 0.2,
            //entry time: sec 
            entryTime: 1,
            user: '',
            pass: '',
            idGotten: false

        }
        this.startTyping = this.startTyping.bind(this);
        this.countDown = this.countDown.bind(this)
        this.countUp = this.countUp.bind(this)
        this.entryDone = this.entryDone.bind(this);

    }

    componentWillMount() {
        this.state.inputValue = ""
        //get cookies
        var cuser = getCookie('user')
        var cpass = getCookie('pass')
        console.log('cookies: '+cuser+ ' : ' + cpass) 

        /*if (getCookie('user')=='') {
            this.setState({user:this.props.userInfo.user, pass: this.props.userInfo.pass})
        } else {
            this.setState({user:getCookie('user'), pass: getCookie('pass')})
        }*/
        this.setState({user:cuser, pass: cpass})
    
    }
    //Gradient color as countdown
    changeColor(e) {
        if (e > 1) {

            var endColor = hexToRgb(this.state.endColor);
            var startColor = hexToRgb('#FFFEFA');
            var percentFade = 1 / e * 0.3;
            var diffRed = endColor.r - startColor.r;
            var diffGreen = endColor.g - startColor.g;
            var diffBlue = endColor.b - startColor.b;

            diffRed = (diffRed * percentFade) + startColor.r;
            diffGreen = (diffGreen * percentFade) + startColor.g;
            diffBlue = (diffBlue * percentFade) + startColor.b;


            this.setState({
                backgroundColor: rgbToHex(Math.round(diffRed), Math.round(diffGreen), Math.round(diffBlue))
            })

        }

    }

    countDown() {

        var newCount = this.state.timeCounter - (this.state.timeCounterInterval)
        this.setState({
            timeCounter: newCount
        })
        if (newCount <= 4.3) {
            this.changeColor(this.state.timeCounter)
        }
    }
    countUp() {
        var newCount = this.state.totalTime + 1
        this.setState({
            totalTime: newCount
        })
    }




    failJournal() {
        console.log('you failed')
        this.state.readOnly = true
        this.state.failed = true
    }
    
   entryDone() {
        var newID = 1
        console.log('entry done')
        //need to change textarea to readonly
        this.state.readOnly = true
        //remove all newlines
        this.state.inputValue = this.state.inputValue.replace(/(\r\n|\n|\r)/gm, " ");
        
        
        //get id for new entry
        fetch('http://127.0.0.1:5000/api/getID', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : "Basic " +btoa(this.state.user + ":" + this.state.pass)
                
            }
        })
        .then(response => response.json())
       .then(jsonData => {
            console.log(jsonData.id)
            fetch('http://127.0.0.1:5000/api/makeEntry', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: this.state.user,
                pass: this.state.pass,
                id: jsonData.id,
                entry: this.state.inputValue
            })
        })
        .then(response => response.json())
        .then(response => {
                console.log(response)
                /*if successful entry, redirect*/
                if (response.status == 202){
                    browserHistory.push('/log');
                }
            
         
            })
        })
        
        
            

    }

    
    
    resetClock() {
        clearInterval(this.state.myTimer);
        this.state.timerCleared = true
        this.setState({
            timeCounter: 5,
            backgroundColor: '#FFFEFA'
        })
    }

    startTyping() {

        //ANTI-SPAM

        //first find the new char/change, needs to happen before inputValue is updated
        var difference = getDifference(this.state.inputValue, document.getElementById('textArea').value)
        //checks if enter
        if (difference != "\n") {
            //not an enter

            //append difference to lastCharArray

            //check if length is more than 4, because we only want last 4 char
            if (this.state.lastCharArray.length < 4) {
                this.state.lastCharArray.push(difference)
            } else {
                //if the array is full, remove first, then add last
                this.state.lastCharArray.splice(0, 1);
                this.state.lastCharArray.push(difference)
            }
            //get the character that was deleted
            var characterDeleted = getDifference(document.getElementById('textArea').value, this.state.inputValue)


            //checks that neither spam or delete happening
            if ((this.state.lastCharArray.allValuesSame() == false || this.state.lastCharArray.length != 4) && (difference != "" && characterDeleted == "")) {
                //it isn't spam or a delete
                this.resetClock();
            } else {
                console.log('spam or delete found!!!!!')
            }


            //inputValue getting updated removing all newlines
            this.setState({
                inputValue: document.getElementById('textArea').value
            });

            //start totalTimer 

            if (typeof this.state.totalTimer == 'undefined') {
                //time hasn't started yet
                this.state.totalTimer = setInterval(this.countUp, 1000);
            }


            var area = document.getElementById('textArea')
            Countable.live(area, function (counter) {
                this.setState({
                    wordCountNum: counter.words
                })
                switch (counter.words) {
                    case 1:
                        this.setState({
                            wordLabel: 'word'
                        })
                        break;

                    default:
                        this.setState({
                            wordLabel: 'words'
                        })
                        break;
                }

            }.bind(this))
            //check that timer isn't already running

            if (this.state.timerCleared == true) {
                //start timer
                this.state.myTimer = setInterval(
                    this.countDown, this.state.timeCounterInterval * 1000)
                this.state.timerCleared = false
            }

        } else {
            console.log('enter found')

        }






    }

    render() {
        //Time counter went down, you failed!
        if ((this.state.timeCounter < 0) && (this.state.failed == false)) {
            this.failJournal();
            clearInterval(this.state.myTimer);
            clearInterval(this.state.totalTimer);
        }
        //Entry is 2 minutes rn
        if (this.state.totalTime == this.state.entryTime) {
            this.entryDone();
            clearInterval(this.state.myTimer);
            clearInterval(this.state.totalTimer);

        }

        return ( <
            div style = {
                {
                    textAlign: "center",
                    alignItems: "center",
                    backgroundColor: '#FFFEFA'
                }
            } >
            <
            img style = {
                loginLogo
            }
            src = "../static/logo.png" />

            <
            div style = {
                {
                    backgroundColor: this.state.backgroundColor,
                    width: "70%",
                    height: "36em",
                    margin: "auto",
                    marginTop: "15px"
                }
            } >
            <
            textarea id = "textArea"
            style = {
                {
                    width: "70%",
                    height: "550px",
                    margin: "auto",
                    marginTop: "15px",
                    fontSize: "24px",
                    color: '#A9AAA9',
                    backgroundColor: this.state.backgroundColor,
                    fontFamily: 'Myriad Pro',
                    resize: 'none',
                    outline: 'none',
                    border: 'none',
                    overflow: 'auto',
                    boxShadow: 'none',
                }
            }
            onChange = {
                this.startTyping
            }
            placeholder = "Start your entry.."
            readOnly = {
                this.state.readOnly
            } >
            </textarea> </
            div > <
            label style = {
                {
                    margin: "auto",
                    fontFamily: 'Myriad Pro',
                    fontSize: "14px",
                    color: '#A9AAA9'
                }
            } > {
                this.state.wordCountNum
            } {
                this.state.wordLabel
            } </label> </
            div >
        )
    }
}
module.exports = Journal;
