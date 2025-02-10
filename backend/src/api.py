from flask import Flask
from flask_dance.contrib.google import make_google_blueprint, google
from .config import Config
from .auth import auth_blueprint
from .routes import main_blueprint
from .extensions import db, login_manager

# API setup
app: Flask = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
login_manager.init_app(app)

# Setting up Google OAuth
google_bp = make_google_blueprint(
    client_id="YOUR_GOOGLE_CLIENT_ID",
    client_secret="YOUR_GOOGLE_CLIENT_SECRET",
    redirect_to="google_login_callback",
)

# Register blueprints
app.register_blueprint(auth_blueprint)
app.register_blueprint(main_blueprint)
app.register_blueprint(google_bp, url_prefix="/api/auth/login")

if __name__ == '__main__':
    app.run(debug=True)