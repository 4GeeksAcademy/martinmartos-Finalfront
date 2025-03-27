"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Comments, Medias, Followers, CharacterFavorites, PlanetFavorites, Planets, Characters
import requests
from datetime import datetime, timezone
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import get_jwt

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"}
    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active==True)).scalar()
    if not row:
        response_body['message'] = 'User not found'
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_active': user['is_active']}
    access_token = create_access_token(identity=email, additional_claims=claims)
    response_body['access_token'] = access_token
    response_body['message'] = 'User logged'
    response_body['results'] = user
    return response_body, 200


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    if request.method == 'POST':
        data = request.json
        row = Users(
                    first_name=data.get('first_name'),
                    email=data.get('email'),
                    password=data["password"],
                    is_active=True)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Nuevo usuario creado correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()  
    additional_claims = get_jwt() 
    print(current_user)
    print(additional_claims)
    response_body['message'] = 'Token válido'
    return response_body, 200

@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = 'Listado de usuarios'
        response_body['results'] = result
        return response_body, 200
    

@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    response_body = {}
    user = db.session.get(Users, id)   
    if not user:
        response_body['message'] = 'Usuario no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = user.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.email = data.get("email", user.email)
        user.phone = data.get("phone", user.phone)
        user.is_active = data.get("is_active", user.is_active)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = user.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de todas las publicaciones (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    descrption=data.get('description'),
                    body=data.get('body'),
                    image_URL=data['image_URL'],
                    user_id=data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La publicación con el id: {id} no existe en nuestro registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data['tittle']
        row.description = data['description']
        row.body = data['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de todos los comentarios (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Comments(body=data.get('body'),
                       user_id=data['user_id'],
                       post_id=data['post_id'])     
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
    # Validar si el id existe
    if not row:
        response_body['message'] = f'El comentario con el id: {id} no existe en nuestro registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body = data['body']
        row.user_id = data['user_id']
        row.post_id = data['post_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de todas las medias (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Medias(type=data.get('type'),
                     url=data.get('url'),
                     post_id=data['post_id'])     
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
    # Validar si el id existe
    if not row:
        response_body['message'] = f'La media con el id: {id} no existe en nuestro registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.type = data['type']
        row.url = data['url']
        row.post_id = data['post_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/followers', methods=['GET', 'POST'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de todos los seguidores (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Followers(following_id=data['following_id'],
                        follower_id=data['follower_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def follower(id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
    # Validar si el id existe
    if not row:
        response_body['message'] = f'El seguidor con el id: {id} no existe en nuestro registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.following_id = data['following_id']
        row.follower_id = data['follower_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/character-favorites', methods=['GET', 'POST'])
def character_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de todos los personajes favoritos (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = CharacterFavorites(user_id=data['user_id'],
                                 character_id=data['character_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/character-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.id == id)).scalar()
    # Validar si el id existe
    if not row:
        response_body['message'] = f'El personaje favorito con el id: {id} no existe en nuestro registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id = data['user_id']
        row.character_id = data['character_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/planet-favorites', methods=['GET', 'POST'])
def planet_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites)).scalars()
        result = [ row.serialize() for row in rows]
        response_body['message'] = f'Listado de todos los planetas favoritos (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = PlanetFavorites(user_id=data['user_id'],
                              planet_id=data['planet_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/planet-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.id == id)).scalar()
    # Validar si el id existe
    if not row:
        response_body['message'] = f'El planeta favorito con el id: {id} no existe en nuestro registros'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id = data['user_id']
        row.planet_id = data['planet_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/characters', methods=['GET'])
def characters_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Personajes importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                character_response = requests.get(result['url'])
                if character_response.status_code == 200:
                    character_data = character_response.json().get('result').get('properties')
                    character = Characters(
                        name = character_data.get('name'),
                        height = character_data.get('height'),
                        mass = character_data.get('mass'),
                        eye_color = character_data.get('eye_color'),
                        hair_color = character_data.get('hair_color'),
                        skin_color = character_data.get('skin_color'),
                        birth_year = character_data.get('birth_year'),
                        gender = character_data.get('gender'))
                    db.session.add(character)
                else:
                    response_body['message'] = 'error al importar al personaje desde swapi'
                    db.session.rollback()
            if next is None:
                    break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400


@api.route('/planets', methods=['GET'])
def planets_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Planetas importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                planet_response = requests.get(result['url'])
                if planet_response.status_code == 200:
                    planet_data = planet_response.json().get('result').get('properties')
                    planet = Planets(
                        name = planet_data.get("name"),
                        diameter = planet_data.get("diameter"),
                        rotation_period = planet_data.get("rotation_period"),
                        orbital_period = planet_data.get("orbital_period"),
                        gravity = planet_data.get("gravity"),
                        population = planet_data.get("population"),
                        climate = planet_data.get("climate"),
                        terrain = planet_data.get("terrain")
                        )
                    db.session.add(planet)
                else:
                    response_body['message'] = 'error al importar el planeta desde swapi'
                    db.session.rollback()
            if next is None:
                    break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400
