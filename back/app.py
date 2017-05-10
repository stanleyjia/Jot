#!/usr/bin/env
from __future__ import print_function
from flask import Flask, render_template, request, jsonify, abort, make_response, Response, redirect
from flask_cors import CORS, cross_origin
import sys


from os.path import expanduser
from pymongo import MongoClient



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
        userData = mydb[username].insert({'user': username, 'password': password})
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

if __name__ == '__main__':
    app.run(debug = True)
