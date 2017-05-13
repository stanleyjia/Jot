var React = require('react')
class Home extends React.Component{
  render() {
    return (
      <div>
        <title>Homepage</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="../static/mystyle.css" />
            
        <header>
          <nav className="navbar navbar navbar-fixed-top" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header" style={{listStyleType: 'none', padding: 0, marginLeft: 60, width: 250, height: 62}}>
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" style={{height: 60, width: 'auto', padding: 0, margin: 0}} href="/"><img style={{width: 70, height: 60}} src="../static/logo.png" /></a>
                <img className="navbar-brand" style={{margin: 0, position: 'fixed', width: 150, height: 15, padding: 0, marginTop: 30, marginLeft: 10}} src="../static/5MinuteJournalText.png" />
              </div>
              <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/">home</a></li>
                  <li><a href="/login">login</a></li>
                    <li><a href="/register">register</a></li>
                  <li><a href>help</a></li>
                  <li><a href>about</a></li>
                  <li><a href>contact</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div className="jumbotron" id="firstSection">
          <img className="img_fluid" style={{height: 'auto', maxWidth: '100%', margins: 'auto'}} src="../static/writingbannerResized.png" />
        </div>
        <div className="jumbotron" style={{backgroundColor: 'white', height: 220, padding: 0, margin: 0}}>
          <div className="row vertical-center" style={{backgroundColor: 'white', height: 220, marginTop: '-30px'}}>
            <div className="col-sm-4 startText">Start today for free!</div>
            <div className="col-sm-4" style={{textAlign: 'center'}}>
              <a href="/app" className="btn btn-primary btn-xlr" role="button" id="getStarted">Start Writing!</a></div>
            <div className="col-sm-4 startText">All it takes is 5 minutes!</div>
          </div>
        </div>
        <div className="jumbotron" id="intro" style={{backgroundColor: '#EFEFEF'}}>
          <h1>Jot.</h1>
          <h3>Your daily journal.</h3>
          <p>The worst enemy a writer faces, whether they are a professional author or a student writing a paper, is their own mind. How often do people sit somewhere struggling to put words on paper? Let me tell you: it's just about the most common problem that happens. If you want to sound smart about it, it happens so frequently that professionals have given it its own name: the dreaded "Writer's Block". </p>
          <p>The "Writer's Block" often comes from our mind fighting back against our thought processes: "This doesn't sound good enough" or "That doesn't sound right..." Whatever it is, these thoughts impede our ability to write to our full potential.To that, we have a solution. <span style={{font: 'bold'}}>Jot</span> is designed to help writers of all skill-levels overcome their biggest obstacle, and have fun in the process. It is a journal-taking program that we have developed to maximize the amount of words users put out. Using Jot can help anyone become a faster, better, and more articulate writer. Find out how it works below.</p>
          <div className="text-center">
            <a href="#secondSection" id="pageScrollButton" className="page-scroll btn btn-primary btn-xl sr-button">How does it work?</a>
          </div>
        </div>
      </div>
    );
  }
};
module.exports = Home;