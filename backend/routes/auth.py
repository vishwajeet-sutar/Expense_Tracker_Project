# routes/auth.py
from flask import Blueprint, request, jsonify
from Expense_Tracker_Project.backend.extensions import db
from Expense_Tracker_Project.backend.models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    name, email, password = data.get("name"), data.get("email"), data.get("password")
    if not all([name, email, password]):
        return jsonify({"msg": "All fields are required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 400
    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully", "user": {"id": user.id, "name": user.name, "email": user.email}}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")
        if not email or not password:
            return jsonify({"msg": "Email and password required"}), 400
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"msg": "Invalid credentials"}), 401
        # No JWT — just return user info
        return jsonify({"msg": "Login successful", "user": {"id": user.id, "name": user.name, "email": user.email}})
    except Exception as e:
        print("Login error:", e)
        return jsonify({"msg": "Internal server error"}), 500

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email, new_password = data.get("email"), data.get("new_password")
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    user.set_password(new_password)
    db.session.commit()
    return jsonify({"msg": "Password updated successfully"})