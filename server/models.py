from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    trips = db.relationship('Trip', backref='user')

    @property
    def password_hash(self):
        raise AttributeError("Password hash is not accessible")
    
    @password_hash.setter
    def password_hash(self, password):
        byte_password = password.encode('utf-8')
        salt = bcrypt.gensalt()
        self._password_hash = bcrypt.hashpw(byte_password, salt)

    def authenticate(self, password):
        byte_password = password.encode('utf-8')
        return bcrypt.checkpw(byte_password, self._password_hash)

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'email': self.email
    #     }

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    destinations = db.relationship('Destination', backref='trip')

    def __repr__(self):
        return f'Trip {self.title}, ID: {self.id}'

class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    time_zone = db.Column(db.String, nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)

    def __repr__(self):
        return f'Destination: {self.name}, ID: {self.id}'