from flask import Flask, render_template, request, jsonify, abort, make_response
from os.path import expanduser
from flask_stormpath import StormpathManager

app = Flask(__name__)




    
app.config['SECRET_KEY'] = 'StanleyIsAwesome'
app.config['STORMPATH_API_KEY_FILE'] = expanduser('~/.stormpath/apiKey.properties')
app.config['STORMPATH_APPLICATION'] = 'Jot'
    
app.config['STORMPATH_ENABLE_GIVEN_NAME'] = False
app.config['STORMPATH_ENABLE_MIDDLE_NAME'] = False
app.config['STORMPATH_ENABLE_SURNAME'] = False


app.config['STORMPATH_ENABLE_REGISTRATION'] = True
app.config['STORMPATH_ENABLE_LOGIN'] = True
app.config['STORMPATH_ENABLE_LOGOUT'] = True

'''app.config['STORMPATH_REGISTRATION_TEMPLATE'] = 'register.html'
app.config['STORMPATH_LOGIN_TEMPLATE'] = 'login.html' 
'''

stormpath_manager = StormpathManager(app)

entries = [
    {
        'id': 1,
        'title':u"Today's Date and time",
        'string':'This is the entry itself'
    }
]

@app.route('/')
def home():
    return 'home page!'

@app.route('/secret')
def secret():
    return 'secret page!'


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)



    



if __name__ == '__main__':
    app.run(debug = True)
