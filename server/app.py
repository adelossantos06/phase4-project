from flask import Flask, request, session, abort, jsonify, make_response
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

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'signin',
        'check_session',
        'trips'
    ]

   
    if request.endpoint not in open_access_list and not session.get('user_id'):
        return {'error': 'Unauthorized'}, 401

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
        print(user_id)
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
        print(session)
        return user.to_dict(), 201

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204

class TripIndex(Resource):
    def get(self):
        
        trips = Trip.query.all()
        return [trip.to_dict() for trip in trips], 200

    def post(self):
        # if not session.get('user_id'):
        #     return {'message': 'Unauthorized'}, 401

        json_data = request.get_json()

        title = json_data.get('title')
        description = json_data.get('description')
        start_date = json_data.get('start_date')
        end_date = json_data.get('end_date')

        if not all([title, description, start_date, end_date]):
            return {'error': 'Missing required fields'}, 422

        new_trip = Trip(
            title=title,
            description=description,
            start_date=start_date,
            end_date=end_date,
            # user_id=session['user_id'] 
        )

        try:
            db.session.add(new_trip)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'error': 'Failed to create trip'}, 422

        return new_trip.to_dict(), 201

    def delete(self, trip_id):
        trip = Trip.query.get(trip_id)
        if not trip:
            return {'message': 'Trip not found'}, 404
        
        db.session.delete(trip)
        db.session.commit()

        return {}, 204

class TripDetail(Resource):
    def get(self, trip_id):
        trip = Trip.query.get_or_404(trip_id)
        return trip.to_dict()

    def delete(self, trip_id):
        trip = Trip.query.get(trip_id)
        if not trip:
            return {'message': 'Trip not found'}, 404
        
        
        Destination.query.filter_by(trip_id=trip_id).delete()

     
        db.session.delete(trip)
        db.session.commit()
        
        return {}, 204
        
class TripDestinations(Resource):
    def get(self, trip_id):
        destinations = Destination.query.filter_by(trip_id=trip_id).all()
        return [destination.to_dict() for destination in destinations], 200

class AddDestination(Resource):
    def post(self, trip_id):
        json_data = request.get_json()
        print("Received data:", json_data)
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
            trip_id=trip_id
        )

        try:
            db.session.add(new_destination)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error:{e}")
            return {'error': 'Failed to create destination'}, 422

        return new_destination.to_dict(), 201

      

     

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(UserIndex, '/users', endpoint='users')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/signin', endpoint='signin')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(TripIndex, '/trips', endpoint='trips')
api.add_resource(TripDetail, '/trips/<int:trip_id>')
api.add_resource(TripDestinations, '/trips/<int:trip_id>/destinations')
api.add_resource(AddDestination, '/trips/<int:trip_id>/destinations')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

