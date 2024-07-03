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
            if field not in json or not json[field].strip():
                return{'error': f'Missing or empty {field}'}, 422
        
        user = User(
            username=json['username'],
            email=json['email']
        )
        user.password_hash = json['password']
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')

        if user_id:
            user = User.query.filter_by(id=user_id).first()
            if user:
                return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401

class Login(Resource):
    def post(self):
        data = request.get_json()

        if not data or 'username' not in data or 'password' not in data:
            return {'error': 'Missing username or password'}, 400

        username = data['username']
        user = User.query.filter(User.username == username).first()

        password = data['password']

        if not user or not user.authenticate(data['password']):
            return {'error': 'Invalid username or password'}, 401

        session['user_id'] = user.id
        return user.to_dict(), 200

class Logout(Resource):
    def delete(self):
        session['user_id'] = None

        return {}, 401

class TripIndex(Resource):
    def get(self):
        if not session.get('user_id'):
            return {'message': 'Unauthorized'}, 401
        
        trips = [trip.to_dict() for trip in Trip.query.all()]

        return (trips), 200

    def post(self):
        if not session.get('user_id'):
            return {'message': 'Unauthorized'}, 401

        json_data = request.get_json()

        title = json_data.get('title')
        description = json_data.get('description')
        start_date = json_data.get('start_date')
        end_date = json_data.get('end_date')

        if not all(key in json_data for key in ('title', 'description', 'start_date', 'end_date')):
            return (422, 'Missing required fields')

        new_trip = Trip(
            title=title,
            description=description,
            start_date=start_date,
            end_date=end_date
            user_id=session['user_id']
        )

        try:
            db.session.add(new_trip)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(422, 'Failed to create trip')

        return new_trip.to_dict(), 201


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(TripIndex, '/trips', endpoint='trips')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

