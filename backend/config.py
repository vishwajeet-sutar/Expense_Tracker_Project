# config.py
import os
from urllib.parse import quote_plus

class Config:
    # Database Credentials
    DB_USER = "root"
    DB_PASSWORD = quote_plus("Vishwa@8421")  # encode special chars
    DB_HOST = "localhost"
    DB_PORT = "3306"
    DB_NAME = "expense_tracker"
    # SQLAlchemy Connection String
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Secret Key
    SECRET_KEY = os.environ.get("SECRET_KEY", "supersecret")