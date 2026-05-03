from flask import Blueprint, request, jsonify, make_response, g
import bcrypt

from server.config import supabase
from server.auth.utils import create_jwt, token_required

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api')


def _set_jwt_cookie(resp, token):
    resp.set_cookie(
        'jwtToken',
        token,
        httponly=True,
        samesite='Lax',
        secure=request.is_secure,
        path='/',
    )


@auth_bp.route('/register', methods=['POST'])
def register():
    """Registers a new user and immediately signs them in via JWT cookie."""
    if not supabase:
        return jsonify({'message': 'Database connection not initialized'}), 500

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password or not name:
        return jsonify({'message': 'Name, email, and password are required'}), 400

    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        print(f"Attempting registration for user: {email}")

        response = supabase.table('users').insert({
            'email': email,
            'password_hash': hashed_password.decode('utf-8'),
            'name': name,
        }).execute()

        if hasattr(response, 'error') and response.error:
            error_message = str(response.error)
            print(f"Supabase registration error: {error_message}")
            if '23505' in error_message or 'duplicate key value violates unique constraint' in error_message:
                return jsonify({'message': 'Email already exists'}), 409
            return jsonify({'message': 'Registration failed due to database error'}), 500

        if not response.data:
            print(f"Registration attempt for {email} resulted in no data and no explicit error.")
            return jsonify({'message': 'Registration failed unexpectedly.'}), 500

        user_id = response.data[0]['id']
        token = create_jwt(user_id)
        resp = make_response(jsonify({'message': 'User registered successfully'}), 201)
        _set_jwt_cookie(resp, token)
        print(f"User {email} registered and signed in.")
        return resp

    except Exception as e:
        print(f"Exception during registration for {email}: {e}")
        return jsonify({'message': 'An internal error occurred during registration'}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """Logs in a user and returns a JWT via HttpOnly cookie."""
    if not supabase:
        return jsonify({'message': 'Database connection not initialized'}), 500

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400

    try:
        print(f"Login attempt for: {email}")
        response = supabase.table('users').select('id, password_hash').eq('email', email).maybe_single().execute()

        if not response.data:
            print(f"Login failed: User {email} not found.")
            return jsonify({'message': 'Invalid credentials'}), 401

        user_data = response.data
        stored_hash = user_data['password_hash'].encode('utf-8')

        if not bcrypt.checkpw(password.encode('utf-8'), stored_hash):
            print(f"Login failed: Incorrect password for {email}.")
            return jsonify({'message': 'Invalid credentials'}), 401

        token = create_jwt(user_data['id'])
        resp = make_response(jsonify({'message': 'Login successful'}))
        _set_jwt_cookie(resp, token)
        print(f"Login successful for {email}.")
        return resp, 200

    except Exception as e:
        print(f"Exception during login for {email}: {e}")
        return jsonify({'message': 'An error occurred during login'}), 500


@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Clears the JWT token cookie to log the user out."""
    print("Logout request received.")
    resp = make_response(jsonify({'message': 'Logout successful'}))
    resp.set_cookie(
        'jwtToken',
        '',
        httponly=True,
        samesite='Lax',
        secure=request.is_secure,
        path='/',
        expires=0,
    )
    return resp, 200


@auth_bp.route('/me', methods=['GET'])
@token_required
def me():
    """Returns the currently authenticated user's profile."""
    if not supabase:
        return jsonify({'message': 'Database connection not initialized'}), 500

    response = supabase.table('users').select('id, email, name').eq('id', g.current_user_id).maybe_single().execute()
    if not response or not response.data:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(response.data), 200
