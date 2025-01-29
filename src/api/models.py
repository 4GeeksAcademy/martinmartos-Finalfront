from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return { "id": self.id,
            "email": self.email}
    

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tittle = db.Column(db.String(), unique=False, nullable=True)
    description = db.Column(db.String(), unique=False, nullable=False)
    body = db.Column(db.String(), unique=False, nullable=False)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    image_URL = db.Column(db.String(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.Foreignkey('users.id'))
    user_to = db.relationship('Users', foreign_key=[user_id], backref =db.backref('posts_to', lazy='select'))
           

class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enium(), unique=False, nullable=False)
    url = db.Column(db.String(), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.Foreignkey('post_id'), unique=True)
    post_to = db.relationship('Posts', foreign_key=[post_id], backref =db.backref('media_to', lazy='select'))


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer(), db.Foreignkey('users.id'))
    following_to = db.relationship('Users', foreign_key=[following_id], backref =db.backref('followings_to', lazy='select'))
    follower_id = db.Column(db.Integer(), db.Foreignkey('users.id'))
    follower_to = db.relationship('Users', foreign_key=[follower_id], backref =db.backref('follower_to', lazy='select'))


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(), unique=False, nullable=False)
    user_id = db.Column(db.Integer(), db.Foreignkey('users_id'))
    user_to = db.relationship('Users', foreign_key=[user_id], backref =db.backref('commment_to', lazy='select'))
    post_id = db.Column(db.Integer(), db.Foreignkey('post_id'))
    post_to = db.relationship('Posts', foreign_key=[post_id], backref =db.backref('comment_to', lazy='select'))


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.Foreignkey('user_id'))
    user_to = db.relationship('Users', foreign_key=[user_id], backref =db.backref('characterfavorites_to', lazy='select'))
    character_id = db.Column(db.Integer(), db.Foreignkey('character_id'))
    character_to = db.relationship('Users', foreign_key=[character_id], backref =db.backref('characterfavorites_to', lazy='select'))

class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.Foreignkey('user_id'))
    user_to = db.relationship('Users', foreign_key=[user_id], backref =db.backref('planetfavorites_to', lazy='select'))
    planet_id = db.Column(db.Integer(),  db.Foreignkey('planet_id')) 
    planet_to = db.relationship('Users', foreign_key=[planet_id], backref =db.backref('planetfavorites_to', lazy='select'))

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    height = db.Column(db.String(), unique=False, nullable=False)
    mass = db.Column(db.String(), unique=False, nullable=False)
    hair_color = db.Column(db.String(), unique=False, nullable=False)
    skin_color = db.Column(db.String(), unique=False, nullable=False)
    eye_color = db.Column(db.String(), unique=False, nullable=False)       
    birth_year = db.Column(db.String(), unique=False, nullable=False)
    gender = db.Column(db.String(), unique=False, nullable=False) 

class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    diameter = db.Column(db.String(), unique=False, nullable=False)
    rotation_period = db.Column(db.String(), unique=False, nullable=False)
    orbital_period = db.Column(db.String(), unique=False, nullable=False)
    gravity = db.Column(db.String(), unique=False, nullable=False)
    population = db.Column(db.String(), unique=False, nullable=False)       
    climate = db.Column(db.String(), unique=False, nullable=False)
    terrain = db.Column(db.String(), unique=False, nullable=False)     