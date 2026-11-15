# routes/expense.py
from flask import Blueprint, request, jsonify
from Expense_Tracker_Project.backend.extensions import db
from Expense_Tracker_Project.backend.models import Expense
from datetime import datetime

expense_bp = Blueprint("expense", __name__)

@expense_bp.route("/", methods=["GET", "POST", "OPTIONS"], strict_slashes=False)
def expenses_root():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    if request.method == "POST":
        return add_expense()
    elif request.method == "GET":
        return get_expenses()

def add_expense():
    data = request.json
    print("DEBUG: Received data:", data)
    required_fields = ["amount", "category", "date", "user_id"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 422
    try:
        amount = float(data["amount"])
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid amount format"}), 422
    try:
        date = datetime.strptime(data["date"], "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid date format, expected YYYY-MM-DD"}), 422
    try:
        user_id = int(data["user_id"])
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid user_id format"}), 422
    expense = Expense(
        user_id=user_id,
        amount=amount,
        category=data["category"],
        date=date,
        description=data.get("description", "")
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify({"msg": "Expense added successfully"}), 201

def get_expenses():
    user_id = request.args.get("user_id", type=int)
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 422
    expenses = Expense.query.filter_by(user_id=user_id).order_by(Expense.date.desc()).all()
    return jsonify([
        {
            "id": e.id,
            "amount": e.amount,
            "category": e.category,
            "date": e.date.strftime("%Y-%m-%d"),
            "description": e.description
        } for e in expenses
    ])

@expense_bp.route("/<int:id>", methods=["PUT", "DELETE", "OPTIONS"], strict_slashes=False)
def expense_detail(id):
    if request.method == "OPTIONS":
        return jsonify({}), 200
    elif request.method == "PUT":
        return update_expense(id)
    elif request.method == "DELETE":
        return delete_expense(id)

def update_expense(id):
    data = request.json
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 422
    expense = Expense.query.filter_by(id=id, user_id=int(user_id)).first()
    if not expense:
        return jsonify({"msg": "Expense not found"}), 404
    if "amount" in data:
        try:
            expense.amount = float(data["amount"])
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid amount format"}), 422
    if "category" in data:
        expense.category = data["category"]
    if "date" in data:
        try:
            expense.date = datetime.strptime(data["date"], "%Y-%m-%d").date()
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid date format, expected YYYY-MM-DD"}), 422
    if "description" in data:
        expense.description = data["description"]
    db.session.commit()
    return jsonify({"msg": "Expense updated"})

def delete_expense(id):
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 422
    expense = Expense.query.filter_by(id=id, user_id=int(user_id)).first()
    if not expense:
        return jsonify({"msg": "Expense not found"}), 404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({"msg": "Expense deleted"})