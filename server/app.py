#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, abort
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Trip, Destination


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        json = request.get_json()

        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field no in json or not json[field].strip():
                return{'error': f'Missing or empty {field}'}, 422
        
        user = User(
            username=json['username'],
            email=json['email']
        )
        user.password_hash = json['password']
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

