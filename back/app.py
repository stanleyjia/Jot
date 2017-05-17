#!/usr/bin/env
from __future__ import print_function
from flask import Flask, render_template, request, jsonify, abort, make_response, Response, redirect
from flask_cors import CORS, cross_origin
import sys
from basicauth import decode


from os.path import expanduser
from pymongo import MongoClient
import pymongo




app = Flask(__name__)
CORS(app)

@app.route('/api/register', methods=['POST', 'OPTION'])
@cross_origin()
def register():
    username = request.json.get('user')
    password = request.json.get('pass')
    mongourl='mongodb://'+'stanleyjia101'+':'+'001229'+'@ds133450.mlab.com:33450/jotapp'
    client = MongoClient(mongourl)
    mydb = client['jotapp']
    if username in mydb.collection_names():
        #account already exists
        message = {
            'status': 410,
            'message': 'This account already exists'
        }
        resp = jsonify(message)
        resp.status_code = 410
        return resp
    else:
        #newaccount
        userData = mydb[username].insert({'type': 'userdata','user': username, 'password': password})
        message = {
            'status': 201,
            'message': 'Successful Registration'
        }
        resp = jsonify(message)
        resp.status_code = 201
        return resp
        
    
    
    print (mydb.collection_names(), file=sys.stderr)
    return ('Registered')




@app.route('/api/login', methods=['POST', 'OPTION'])
@cross_origin()
def login():
    username = request.json.get('user')
    password = request.json.get('pass')
    mongourl='mongodb://'+'stanleyjia101'+':'+'001229'+'@ds133450.mlab.com:33450/jotapp'
    client = MongoClient(mongourl)
    mydb = client['jotapp']
    if username in mydb.collection_names():
        #account exists which is good
        mycollection = mydb[username]
        myuser = mycollection.find_one({'user':username})
        dbpass = myuser.get('password')

        if password == dbpass :
            #password match
            message = {
            'status': 202,
            'message': 'Logged in'
            }
            resp = jsonify(message)
            resp.status_code = 202
            return resp
        
        else:
            #password doesn't match
            
            message = {
            'status': 412,
            'message': 'Incorrect Password'
            }
            resp = jsonify(message)
            resp.status_code = 412
            return resp
        
    else:
        #account doesn't exist
        message = {
            'status': 411,
            'message': 'Account with this username does not exist'
        }
        resp = jsonify(message)
        resp.status_code = 411
        return resp
   
    print (mydb.my_collection.find({}), file=sys.stderr)
    return ('adsf')

@app.route('/api/makeEntry', methods=['POST', 'OPTION'])
@cross_origin()
def makeEntry():
    username = request.json.get('user')
    password = request.json.get('pass')
    entryID = request.json.get('id')
    entry = request.json.get('entry')
    
    mongourl='mongodb://'+'stanleyjia101'+':'+'001229'+'@ds133450.mlab.com:33450/jotapp'
    client = MongoClient(mongourl)
    mydb = client['jotapp']
    if username in mydb.collection_names():
        #account exists which is good
        mycollection = mydb[username]
        myuser = mycollection.find_one({'user':username})
        dbpass = myuser.get('password')

        if password == dbpass :
            #password match 202
            newEntry = mydb[username].insert({'type': 'entry','id' : entryID, 'entry': entry})
           #successful new entry 203 fetch response
            message = {
                'status': 203,
                'message': 'Successful Entry'
                }
            resp = jsonify(message)
            resp.status_code = 203
            return resp
        
        else:
            #password doesn't match
            
            message = {
            'status': 413,
            'message': 'Account not found'
            }
            resp = jsonify(message)
            resp.status_code = 413
            return resp
        
    else:
        #account doesn't exist
        message = {
            'status': 413,
            'message': 'Account not found'
        }
        resp = jsonify(message)
        resp.status_code = 413
        return resp


@app.route('/api/getID', methods=['GET'])
@cross_origin()
def getid():
    auth = request.headers.get('Authorization')
    decoded = decode(auth)

    username = decoded[0]
    password = decoded[1]

    mongourl='mongodb://'+'stanleyjia101'+':'+'001229'+'@ds133450.mlab.com:33450/jotapp'
    client = MongoClient(mongourl)
    mydb = client['jotapp']
    if username in mydb.collection_names():
        #account exists which is good
        mycollection = mydb[username]
        myuserdata = mycollection.find_one({'user':username})
        dbpass = myuserdata.get('password')
        myentries=mycollection.find_one({'type':'entry'}, sort=[('id', pymongo.DESCENDING)])
        

        if password == dbpass :
            #password match 
            try:
               #there is already a post/id
                largestID = myentries.get('id')
                newID = str(int(largestID) + 1)
                print (newID, file=sys.stderr)
                message = {
                'status': 205,
                'message': 'Successful new ID',
                    'id': newID
                }
                resp = jsonify(message)
                return resp
                #return jsonify({'id': newID})
                
            
            except (AttributeError, TypeError): 
                #no previous id
                message = {
                'status': 205,
                'message': 'Successful new ID',
                    'id': '1'
                }
                resp = jsonify(message)
                return resp
            
    
        
        else:
            #password doesn't match
            
            message = {
            'status': 413,
            'message': 'Account not found'
            }
            resp = jsonify(message)
            resp.status_code = 413
            return resp
        
    else:
        #account doesn't exist
        message = {
            'status': 413,
            'message': 'Account not found'
        }
        resp = jsonify(message)
        resp.status_code = 413
        return resp






if __name__ == '__main__':
    app.run(debug = True)
