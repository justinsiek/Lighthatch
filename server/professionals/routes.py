from flask import Blueprint, jsonify, request, g

from server.config import supabase
from server.auth.utils import token_required

professionals_bp = Blueprint('professionals_bp', __name__, url_prefix='/api')

VALID_INDUSTRIES = {
    'Logistics',
    'Real Estate',
    'Hospitality',
    'Insurance',
    'Construction',
    'Home Services',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Finance',
    'Accounting',
    'Legal',
    'Education',
    'Marketing',
    'Software',
    'Beauty & Wellness',
    'Automotive',
    'Agriculture',
    'Nonprofit',
}
VALID_DURATIONS = {'15', '30', '60'}


@professionals_bp.route('/professionals', methods=['GET'])
def list_professionals():
    """Returns every professional profile joined with the user's name."""
    if not supabase:
        return jsonify({'message': 'Database connection not initialized'}), 500

    response = supabase.table('professional_profiles').select(
        'user_id, role, industry, bio, pricing, photo_url, linkedin_url, users(name)'
    ).execute()

    if not response.data:
        return jsonify([]), 200

    result = []
    for row in response.data:
        user = row.pop('users', None) or {}
        row['name'] = user.get('name')
        result.append(row)
    return jsonify(result), 200


@professionals_bp.route('/professionals', methods=['POST'])
@token_required
def create_professional():
    """Creates a professional profile for the currently authenticated user."""
    if not supabase:
        return jsonify({'message': 'Database connection not initialized'}), 500

    data = request.get_json() or {}
    role = (data.get('role') or '').strip()
    industry = (data.get('industry') or '').strip()
    bio = (data.get('bio') or '').strip()
    pricing = data.get('pricing')
    linkedin_url = (data.get('linkedin_url') or '').strip() or None

    if not role or not industry or not bio:
        return jsonify({'message': 'Role, industry, and bio are required'}), 400
    if industry not in VALID_INDUSTRIES:
        return jsonify({'message': 'Invalid industry'}), 400
    if not isinstance(pricing, dict) or not pricing:
        return jsonify({'message': 'Pick at least one call duration and price'}), 400

    cleaned_pricing = {}
    for duration_key, cents in pricing.items():
        key = str(duration_key)
        if key not in VALID_DURATIONS:
            return jsonify({'message': f'Invalid call duration: {key}'}), 400
        if not isinstance(cents, int) or cents <= 0:
            return jsonify({'message': f'Price for {key} min must be a positive number'}), 400
        cleaned_pricing[key] = cents

    try:
        response = supabase.table('professional_profiles').insert({
            'user_id': g.current_user_id,
            'role': role,
            'industry': industry,
            'bio': bio,
            'pricing': cleaned_pricing,
            'linkedin_url': linkedin_url,
        }).execute()

        if hasattr(response, 'error') and response.error:
            error_message = str(response.error)
            print(f"Supabase create-professional error: {error_message}")
            if '23505' in error_message or 'duplicate key' in error_message:
                return jsonify({'message': 'You already have a professional profile'}), 409
            return jsonify({'message': 'Failed to create profile'}), 500

        return jsonify(response.data[0] if response.data else {}), 201

    except Exception as e:
        print(f"Exception creating professional profile: {e}")
        return jsonify({'message': 'An internal error occurred'}), 500
