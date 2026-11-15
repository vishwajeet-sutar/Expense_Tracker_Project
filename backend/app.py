# app.py
from flask import Flask
from flask_cors import CORS
from Expense_Tracker_Project.backend.extensions import db
from Expense_Tracker_Project.backend.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True,
        expose_headers="*",
        allow_headers="*",
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )
    from Expense_Tracker_Project.backend.routes.auth import auth_bp
    from Expense_Tracker_Project.backend.routes.expense import expense_bp
    from Expense_Tracker_Project.backend.routes.report import report_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(expense_bp, url_prefix="/api/expenses")
    app.register_blueprint(report_bp, url_prefix="/api/reports")
    with app.app_context():
        db.create_all()
        print("Tables created!")
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)