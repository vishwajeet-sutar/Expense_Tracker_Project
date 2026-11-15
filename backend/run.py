# run.py (for initial setup, run once)
from Expense_Tracker_Project.backend.app import create_app, db
from Expense_Tracker_Project.backend.models import User, Expense

app = create_app()
with app.app_context():
    db.drop_all()  # Drop existing tables to ensure clean schema
    db.create_all()
    print("Tables created!")