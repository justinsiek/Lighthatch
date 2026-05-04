from flask import Blueprint, jsonify

from server.config import supabase

professionals_bp = Blueprint('professionals_bp', __name__, url_prefix='/api')


@professionals_bp.route('/professionals', methods=['GET'])
def list_professionals():
    """Returns every professional profile joined with the user's name."""
    if not supabase:
        return jsonify({'message': 'Database connection not initialized'}), 500

    response = supabase.table('professional_profiles').select(
        'user_id, role, industry, bio, rate_cents, durations, photo_url, linkedin_url, users(name)'
    ).execute()

    if not response.data:
        return jsonify([]), 200

    result = []
    for row in response.data:
        user = row.pop('users', None) or {}
        row['name'] = user.get('name')
        result.append(row)
    return jsonify(result), 200
