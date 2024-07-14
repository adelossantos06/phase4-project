from flask import Flask, request, session, abort, jsonify
from flask_restful import Resource
# from werkzeug.local import Local
# from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Trip, Destination

@app.route('/')
def index():
    return '<h1>Project Servers</h1>'

class Signup(Resource):
    def post(self):
        json = request.get_json()

        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in json or not json[field].strip():
                return {'error': f'Missing or empty {field}'}, 422

        user = User(
            username=json['username'],
            email=json['email']
        )
        
        user.password_hash = json['password']
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user.to_dict(), 201

class UserIndex(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict() for user in users], 200

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
        password = data['password']

        user = User.query.filter_by(username=username).first()

        if not user:
            return {'error': 'User does not exist'}, 401

        if not user.authenticate(password):
            return {'error': 'Invalid username or password'}, 401

        session['user_id'] = user.id
        
        return user.to_dict(), 200

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204

class TripIndex(Resource):
    def get(self):
        if not session.get('user_id'):
            return {'message': 'Unauthorized'}, 401

        trips = [trip.to_dict() for trip in Trip.query.filter_by(user_id=session['user_id']).all()]
        return trips, 200

    def post(self):
        if not session.get('user_id'):
            return {'message': 'Unauthorized'}, 401

        json_data = request.get_json()

        title = json_data.get('title')
        description = json_data.get('description')
        start_date = json_data.get('start_date')
        end_date = json_data.get('end_date')
        # destinations = json_data.get('destinations')

        # if not all([title, description, start_date, end_date, destinations]):
        if not all([title, description, start_date, end_date]):
            return {'error': 'Missing required fields'}, 422

        new_trip = Trip(
            title=title,
            description=description,
            start_date=start_date,
            end_date=end_date,
            user_id=session['user_id']
        )

        try:
            db.session.add(new_trip)
            db.session.commit()

            # for dest in destinations:
            #     new_destination = Destination(
            #         city=dest['city'],
            #         state=dest['state'],
            #         country=dest['country'],
            #         time_zone=dest['time_zone'],
            #         trip_id=new_trip.id
            #     )
            #     db.session.add(new_destination)

            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'error': 'Failed to create trip'}, 422

        return new_trip.to_dict(), 201

class DestinationIndex(Resource):
    def get(self):
        if not session.get('user_id'):
            return {'message': 'Unauthorized'}, 401

        destinations = [destination.to_dict() for destination in Destination.query.all()]
        return destinations, 200

    def post(self):
        if not session.get('user_id'):
            return {'message': 'Unauthorized'}, 401

        json_data = request.get_json()

        city = json_data.get('city')
        state = json_data.get('state')
        country = json_data.get('country')
        time_zone = json_data.get('time_zone')

        if not all([city, state, country, time_zone]):
            return {'error': 'Missing required fields'}, 422

        new_destination = Destination(
            city=city,
            state=state,
            country=country,
            time_zone=time_zone,
            trip_id=json_data.get('trip_id')
        )

        try:
            db.session.add(new_destination)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'error': 'Failed to create destination'}, 422

        return new_destination.to_dict(), 201

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(UserIndex, '/users', endpoint='users')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/signin', endpoint='signin')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(TripIndex, '/trips', endpoint='trips')
api.add_resource(DestinationIndex, '/destinations', endpoint='destinations')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

