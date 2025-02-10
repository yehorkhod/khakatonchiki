from flask import Flask
from .config import Config
from .auth import auth_blueprint
from .routes import main_blueprint
from .extensions import db, sock, login_manager

# API setup
app: Flask = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
sock.init_app(app)
login_manager.init_app(app)

# Register blueprints
app.register_blueprint(auth_blueprint)
app.register_blueprint(main_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
