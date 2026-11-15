# routes/report.py
from flask import Blueprint, request, jsonify
from Expense_Tracker_Project.backend.extensions import db
from Expense_Tracker_Project.backend.models import Expense
from datetime import datetime, timedelta

report_bp = Blueprint("report", __name__)

def group_expenses(expenses):
    return [
        {
            "id": e.id,
            "amount": e.amount,
            "category": e.category,
            "date": e.date.strftime("%Y-%m-%d"),
            "description": e.description
        } for e in expenses
    ]

@report_bp.route("/weekly", methods=["GET"])
def weekly_report():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 422
    start_date = datetime.utcnow() - timedelta(days=7)
    expenses = Expense.query.filter(Expense.user_id == int(user_id), Expense.date >= start_date.date()).all()
    return jsonify(group_expenses(expenses))

@report_bp.route("/monthly", methods=["GET"])
def monthly_report():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 422
    start_date = datetime.utcnow() - timedelta(days=30)
    expenses = Expense.query.filter(Expense.user_id == int(user_id), Expense.date >= start_date.date()).all()
    return jsonify(group_expenses(expenses))

@report_bp.route("/yearly", methods=["GET"])
def yearly_report():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 422
    start_date = datetime.utcnow() - timedelta(days=365)
    expenses = Expense.query.filter(Expense.user_id == int(user_id), Expense.date >= start_date.date()).all()
    return jsonify(group_expenses(expenses))